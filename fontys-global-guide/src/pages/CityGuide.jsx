import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// haal deze uit commentaar als je ze hebt
// import tilburgImg from "../images/tilburg.jpg";
// import eindhovenImg from "../images/Eindhoven.webp";
// import sittardImg from "../images/sittard.jpg";
// import VenloImg from "../images/Venlo.jpg";
// import denboschImg from "../images/denbosch.webp";
// import utrechtImg from "../images/Utrecht.webp";

export default function CityGuide() {
    const [selectedCity, setSelectedCity] = useState(null);
    const { t } = useTranslation();

    const styles = {
        container: {
            fontFamily: "system-ui, sans-serif",
            padding: 20,
            maxWidth: 420,
            margin: "0 auto",
        },
        header: {
            background: "#67327a",
            color: "white",
            padding: "14px 16px",
            borderRadius: 6,
            marginBottom: 20,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
        },
        card: {
            position: "relative",
            height: 200,
            borderRadius: 19,
            background: "#d9d9d9",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            overflow: "hidden",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
        },
        label: {
            marginBottom: 60,
            background: "white",
            padding: "6px 14px",
            borderRadius: 15,
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            fontFamily: "montserrat, sans-serif",
        },
        backButton: {
            marginBottom: 20,
            padding: "10px 14px",
            background: "#67327a",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
        },
        detailImage: {
            width: "100%",
            borderRadius: 12,
            marginBottom: 20,
        }
    };

    // 🔤 alle tekst komt nu uit i18n
    const cities = [
        {
            id: "tilburg",
            name: t("cityGuide.tilburg.name"),
            image: tilburgImg,
            info: t("cityGuide.tilburg.info")
        },
        {
            id: "eindhoven",
            name: t("cityGuide.eindhoven.name"),
            image: eindhovenImg,
            info: {
                intro: t("cityGuide.eindhoven.intro"),
                housing: t("cityGuide.eindhoven.housing"),
                housinglink: [
                    { url: "https://www.wooniezie.nl", label: "Wooniezie.nl" },
                    { url: "https://www.huurwoningen.com/in/eindhoven/", label: "Huurwoningen.com" },
                    { url: "https://kamernet.nl/huren/kamer-eindhoven", label: "Kamernet.nl" },
                    { url: "https://www.fontys.nl/nieuws/hospi-housing-wordt-platform-voor-studenten-en-hospitas-in-eindhoven/", label: "Fontys Hospi Housing" }
                ],
                transport: t("cityGuide.eindhoven.transport"),
                highlights: t("cityGuide.eindhoven.highlights", { returnObjects: true })
            }
        },
        {
            id: "sittard",
            name: t("cityGuide.sittard.name"),
            image: sittardImg,
            info: t("cityGuide.sittard.info")
        },
        {
            id: "venlo",
            name: t("cityGuide.venlo.name"),
            image: VenloImg,
            info: t("cityGuide.venlo.info")
        },
        {
            id: "denbosch",
            name: t("cityGuide.denbosch.name"),
            image: denboschImg,
            info: t("cityGuide.denbosch.info")
        },
        {
            id: "utrecht",
            name: t("cityGuide.utrecht.name"),
            image: utrechtImg,
            info: t("cityGuide.utrecht.info")
        },
    ];

    // ⭐ DETAIL SCREEN ⭐
    if (selectedCity) {
        const info = selectedCity.info;

        return (
            <div style={styles.container}>
                <button style={styles.backButton} onClick={() => setSelectedCity(null)}>
                    ← {t("cityGuide.back")}
                </button>

                <h1>{selectedCity.name}</h1>

                <img
                    src={selectedCity.image}
                    alt={selectedCity.name}
                    style={styles.detailImage}
                />

                {typeof info === "string" ? (
                    <p>{info}</p>
                ) : (
                    <div>
                        <h3>{t("cityGuide.sections.about", { city: selectedCity.name })}</h3>
                        <p>{info.intro}</p>

                        <h3>{t("cityGuide.sections.housing")}</h3>
                        <p>{info.housing}</p>

                        {info.housinglink && (
                            <div>
                                <h4>{t("cityGuide.sections.housingLinksTitle")}</h4>
                                {info.housinglink.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-block",
                                            margin: "5px 8px 5px 0",
                                            padding: "8px 14px",
                                            background: "#67327a",
                                            color: "white",
                                            textDecoration: "none",
                                            borderRadius: 6,
                                            fontSize: 14,
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        <h3>{t("cityGuide.sections.transport")}</h3>
                        <p>{info.transport}</p>

                        <h3>{t("cityGuide.sections.highlights")}</h3>
                        <ul>
                            {info.highlights.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    // ⭐ OVERVIEW SCREEN ⭐
    return (
        <div style={styles.container}>
            <div style={styles.header}>{t("cityGuide.header")}</div>

            <div style={styles.grid}>
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() => setSelectedCity(city)}
                        style={{
                            ...styles.card,
                            backgroundImage: city.image ? `url(${city.image})` : "none",
                        }}
                    >
                        <div style={styles.label}>{city.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
