import { useEffect, useState } from 'react';
import { db } from '../firebase/config.js';
import {
    collection,
    doc,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import '../styles/StudentCommunity.css';
import { useTranslation } from "react-i18next";

function StudentCommunity() {
    const [channels, setChannels] = useState([]);
    const [selectedChannelId, setSelectedChannelId] = useState("general");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { t } = useTranslation();

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

        const text = newMessage.trim();
        if (!text || !selectedChannelId) return;

        try {
            const channelRef = doc(db, "channels", selectedChannelId);
            const messagesRef = collection(channelRef, "messages");

            await addDoc(messagesRef, {
                userId: "testUser123",
                text,
                createdAt: serverTimestamp(),
            });

            setNewMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="container mt-4">
            {/* 👇 deze moet via t() */}
            <h2 className="mb-3">{t("studentCommunity.title")}</h2>

            {/* CHANNEL LIST */}
            <div className="mb-3 d-flex gap-2 flex-wrap">
                {channels.map((ch) => (
                    <button
                        key={ch.id}
                        className={
                            "btn btn-sm " +
                            (ch.id === selectedChannelId ? "btn-primary" : "btn-outline-primary")
                        }
                        onClick={() => setSelectedChannelId(ch.id)}
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
                        const isOwn = msg.userId === "testUser123";

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
                                        {msg.userId || "Unknown user"} •{" "}
                                        {msg.createdAt?.toDate
                                            ? msg.createdAt.toDate().toLocaleTimeString()
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

export default StudentCommunity;
