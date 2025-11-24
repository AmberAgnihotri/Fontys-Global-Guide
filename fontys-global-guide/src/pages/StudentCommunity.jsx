import { useEffect, useState } from 'react';
import { db } from '../firebase/config.js';
import {
    collection,
    doc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";

function StudentCommunity() {
    const [channels, setChannels] = useState([]);
    const [selectedChannelId, setSelectedChannelId] = useState("general");
    const [messages, setMessages] = useState([]);


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

    // 2) Load messages for the selected channel
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
        </div>
    );
}

export default StudentCommunity;