import { useState } from "react";
import { signupWithEmail } from "../firebase/auth";
import fontysLogoImg from "../assets/fontys-logo-wit.png";
import { useNavigate } from "react-router-dom";
 
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate?.() ?? (() => {});
 
  const handleSignUp = async (e) => {
    e?.preventDefault?.();
    setError("");
    setInfo("");
 
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
 
    setLoading(true);
    try {
      const res = await signupWithEmail(email, password, { saveToFirestore: true });
      console.log("Account created:", res.user);
 
      setInfo("Your account has been created successfully.");
 
 
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") setError("This email address is already in use.");
      else if (err.code === "auth/invalid-email") setError("Invalid email address.");
      else if (err.code === "auth/weak-password") setError("Weak password (minimum 6 characters).");
      else setError("Unable to create account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
<div style={{
      minHeight: '100vh',
      backgroundColor: '#663366',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
<div style={{ textAlign: 'center', marginBottom: '40px' }}>
<img src={fontysLogoImg} alt="Fontys Logo" style={{ width: '240px', marginBottom: '12px' }} />
<h2 style={{ color: 'white', margin: 0, fontWeight: 300 }}>Create an account</h2>
</div>
 
      <form onSubmit={handleSignUp} style={{ width: '100%', maxWidth: '420px', background: 'rgba(0,0,0,0.1)', padding: '24px', borderRadius: '12px' }}>
        {error && <div style={{ background: '#701010', color: 'white', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>{error}</div>}
        {info && <div style={{ background: '#114411', color: 'white', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>{info}</div>}
 
        <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Email</label>
<input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
        />
 
        <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Password</label>
<input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
        />
 
        <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Confirm password</label>
<input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '18px', boxSizing: 'border-box' }}
        />
 
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: 'white',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
>
          {loading ? "Processing..." : "Create account"}
</button>
 
        <div style={{ marginTop: '12px', textAlign: 'center', color: 'white' }}>
          Already have an account?{" "}
<button type="button" onClick={() => navigate("/login")} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            Log in
</button>
</div>
</form>
</div>
  );
}