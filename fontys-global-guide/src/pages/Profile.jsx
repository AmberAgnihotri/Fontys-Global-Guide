import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import {
    onAuthStateChanged,
    updateEmail,
    updatePassword,
} from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function Profile() {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firebaseUser, setFirebaseUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (!user) {
                    setFirebaseUser(null);
                    setLoading(false);
                    return;
                }

                setFirebaseUser(user);
                setEmail(user.email || "");

                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if (snap.exists()) {
                    const data = snap.data();
                    setDisplayName(data.displayName || "");
                } else {
                    // fallback: stuk vóór @ uit het e-mailadres
                    setDisplayName((user.email || "").split("@")[0]);
                }
            } catch (err) {
                console.error(err);
                setError(t("profile.loadError"));
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [t]);

    // 🔹 Opslaan
    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");

        const user = firebaseUser;
        if (!user) {
            setError(t("profile.notLoggedError"));
            return;
        }

        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setError(t("profile.passwordMismatch"));
                return;
            }
            if (newPassword.length < 6) {
                setError(t("profile.passwordTooShort"));
                return;
            }
        }

        try {
            setSaving(true);

            // 1) e-mail in Auth updaten (als veranderd)
            if (email && email !== user.email) {
                await updateEmail(user, email);
            }

            // 2) displayName + email in Firestore updaten
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                displayName: displayName || email.split("@")[0],
                email: email,
            });

            // 3) wachtwoord updaten (optioneel)
            if (newPassword) {
                await updatePassword(user, newPassword);
            }

            setInfo(t("profile.updated"));
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error(err);
            if (err.code === "auth/requires-recent-login") {
                setError(t("profile.reauth"));
            } else {
                setError(t("profile.saveError"));
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <p>{t("profile.loading")}</p>
            </div>
        );
    }

    if (!loading && !firebaseUser) {
        return (
            <div className="container mt-4">
                <p>{t("profile.notLoggedIn")}</p>
            </div>
        );
    }

    const firstLetter = (displayName || email || "?")
        .charAt(0)
        .toUpperCase();

    return (
        <div className="container mt-4" style={{ maxWidth: 480 }}>
            <h2 className="mb-4 text-center">{t("profile.title")}</h2>

            <div
                style={{
                    background: "white",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                {/* Avatar + naam */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div
                        style={{
                            width: 96,
                            height: 96,
                            borderRadius: "50%",
                            margin: "0 auto 12px",
                            background: "#663366",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 40,
                            fontWeight: "bold",
                        }}
                    >
                        {firstLetter}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: "600" }}>
                        {displayName || t("profile.fallbackName", { defaultValue: "Student" })}
                    </div>
                    <div style={{ color: "#777", fontSize: 14 }}>{email}</div>
                </div>

                {error && (
                    <div
                        style={{
                            background: "#f8d7da",
                            color: "#721c24",
                            padding: "10px 12px",
                            borderRadius: 8,
                            marginBottom: 12,
                            fontSize: 14,
                        }}
                    >
                        {error}
                    </div>
                )}

                {info && (
                    <div
                        style={{
                            background: "#d4edda",
                            color: "#155724",
                            padding: "10px 12px",
                            borderRadius: 8,
                            marginBottom: 12,
                            fontSize: 14,
                        }}
                    >
                        {info}
                    </div>
                )}

                <form onSubmit={handleSave}>
                    {/* Display name */}
                    <div style={{ marginBottom: 16 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 14,
                                marginBottom: 6,
                                fontWeight: 500,
                            }}
                        >
                            {t("profile.username")}
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #ddd",
                                fontSize: 15,
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 14,
                                marginBottom: 6,
                                fontWeight: 500,
                            }}
                        >
                            {t("profile.email")}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #ddd",
                                fontSize: 15,
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 16 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 14,
                                marginBottom: 6,
                                fontWeight: 500,
                            }}
                        >
                            {t("profile.newPassword")}
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder={t("profile.passwordPlaceholder")}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #ddd",
                                fontSize: 15,
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 14,
                                marginBottom: 6,
                                fontWeight: 500,
                            }}
                        >
                            {t("profile.confirmPassword")}
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 10,
                                border: "1px solid #ddd",
                                fontSize: 15,
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: 999,
                            border: "none",
                            backgroundColor: "#663366",
                            color: "white",
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: saving ? "not-allowed" : "pointer",
                        }}
                    >
                        {saving ? t("profile.saving") : t("profile.save")}
                    </button>
                </form>
            </div>
        </div>
    );
}
