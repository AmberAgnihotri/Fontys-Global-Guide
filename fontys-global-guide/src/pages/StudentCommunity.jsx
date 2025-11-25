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

function StudentCommunity() {
    const [channels, setChannels] = useState([]);
    const [selectedChannelId, setSelectedChannelId] = useState("general");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // 1) Channels ophalen
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

    // 2) Messages ophalen voor geselecteerde channel
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

    // 3) Bericht versturen
    const handleSendMessage = async (e) => {
        e.preventDefault();

        const text = newMessage.trim();
        if (!text || !selectedChannelId) return;

        try {
            const channelRef = doc(db, "channels", selectedChannelId);
            const messagesRef = collection(channelRef, "messages");

            await addDoc(messagesRef, {
                userId: "testUser123",   // later vervangen door echte userId
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
            <h2 className="mb-3">Student Community</h2>

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

            {/* MESSAGES */}
            <div className="card">
                <div className="card-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    {messages.length === 0 && (
                        <p className="text-muted">No messages yet in this channel.</p>
                    )}

                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2">
                            <div className="small text-muted">
                                {msg.userId || "Unknown user"} •{" "}
                                {msg.createdAt?.toDate
                                    ? msg.createdAt.toDate().toLocaleString()
                                    : "just now"}
                            </div>
                            <div>{msg.text}</div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>

            {/* MESSAGE INPUT */}
            <form onSubmit={handleSendMessage} className="mt-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StudentCommunity;
