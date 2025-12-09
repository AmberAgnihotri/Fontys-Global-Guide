import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config.js';
import {
    collection,
    doc,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    getDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import '../styles/StudentCommunity.css';
import { useTranslation } from "react-i18next";

export default function StudentCommunity() {
    const [channels, setChannels] = useState([]);
    const [selectedChannelId, setSelectedChannelId] = useState("general");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if (snap.exists()) setProfileData(snap.data());
                else {
                    setProfileData({
                        displayName: user.email.split("@")[0]
                    });
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const channelsRef = collection(db, "channels");
        const unsubscribe = onSnapshot(channelsRef, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChannels(list);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedChannelId) return;

        const channelRef = doc(db, "channels", selectedChannelId);
        const messagesRef = collection(channelRef, "messages");

        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(list);
        });

        return () => unsubscribe();
    }, [selectedChannelId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!currentUser) return alert("You must be logged in!");
        if (!newMessage.trim()) return;

        try {
            const channelRef = doc(db, "channels", selectedChannelId);
            const messagesRef = collection(channelRef, "messages");

            await addDoc(messagesRef, {
                userId: currentUser.uid,
                displayName: profileData?.displayName || currentUser.email.split("@")[0],
                text: newMessage.trim(),
                createdAt: serverTimestamp(),
            });

            setNewMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{t("studentCommunity.title")}</h2>

            <div className="mb-3 d-flex gap-2 flex-wrap">
                {channels.map((ch) => (
                    <button
                        key={ch.id}
                        className={
                            "btn btn-sm " +
                            (ch.id === selectedChannelId
                                ? "btn-primary"
                                : "btn-outline-primary")
                        }
                        onClick={() => setSelectedChannelId(ch.id)}
                        style={{
                            backgroundColor: ch.id === selectedChannelId ? "#663366" : "white",
                            color: ch.id === selectedChannelId ? "white" : "#663366",
                            borderColor: "#663366",
                        }}
                    >
                        {ch.name}
                    </button>
                ))}
            </div>

            <div className="card chat-card">
                <div className="chat-messages">
                    {messages.length === 0 && (
                        <p className="text-muted">{t("studentCommunity.noMessages")}</p>
                    )}

                    {messages.map((msg) => {
                        const isOwn = msg.userId === currentUser?.uid;

                        return (
                            <div
                                key={msg.id}
                                className={
                                    "chat-message-row " +
                                    (isOwn ? "chat-message-row--own" : "")
                                }
                            >
                                <div
                                    className={
                                        "chat-message-bubble " +
                                        (isOwn
                                            ? "chat-message-bubble--own"
                                            : "chat-message-bubble--other")
                                    }
                                >
                                    <div className="chat-message-meta">
                                        {msg.displayName || "Unknown user"} •{" "}
                                        {msg.createdAt?.toDate
                                            ? msg.createdAt.toDate().toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "just now"}
                                    </div>

                                    <div className="chat-message-text">{msg.text}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-bar">
                <button type="button" className="chat-plus-btn">+</button>

                <input
                    type="text"
                    className="chat-input"
                    placeholder={t("studentCommunity.placeholder")}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <button type="submit" className="chat-send-btn">
                    ➤
                </button>
            </form>
        </div>
    );
}
