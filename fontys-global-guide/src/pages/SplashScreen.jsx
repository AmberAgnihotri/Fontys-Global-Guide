import { useEffect, useState } from "react";
import fontysLogoImg from "../assets/fontys-logo-wit.png";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000); 
    setTimeout(() => onFinish(), 2000);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        position: "fixed",
        inset: 0,
        backgroundColor: "#663366",
        display: "flex",
        flexDirection: "column",    // ➜ ZET LOGO + TEKST VERTICAAL
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
    >
      <img
        src={fontysLogoImg}
        alt="Fontys Logo"
        style={{ width: "260px", marginBottom: "15px" }}
      />

      {/* ➜ GLOBAL GUIDE TEKST */}
      <p style={{ color: "white", fontSize: "20px", margin: 0 }}>
        Global Guide
      </p>
    </div>
  );
}
