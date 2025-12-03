import React, { useState } from "react";

// import tilburgImg from "../images/tilburg.jpg";
// import eindhovenImg from "../images/Eindhoven.webp";
// import sittardImg from "../images/sittard.jpg";
// import VenloImg from "../images/Venlo.jpg";
// import denboschImg from "../images/denbosch.webp";
// import utrechtImg from "../images/Utrecht.webp";

export default function CityGuide() {
    const [selectedCity, setSelectedCity] = useState(null);

    const cities = [
        {
            name: "Tilburg",
            image: tilburgImg,
            info: "Tilburg staat bekend om het bruisende centrum."
        },
        {
            name: "Eindhoven",
            image: eindhovenImg,
            info: {
                intro: "Eindhoven is de lichtstad van Nederland en staat bekend om technologie, design en innovatie.",
                housing: "De gemiddelde huur ligt rond €900–€1300 per maand, afhankelijk van de wijk.",
                housinglink: [
                    { url: "https://www.wooniezie.nl", label: "Wooniezie.nl" },
                    { url: "https://www.huurwoningen.com/in/eindhoven/?utm_source=google&utm_medium=ads&utm_campaign=16719250034&utm_adgroup=132905063257&gad_source=1&gad_campaignid=16719250034&gbraid=0AAAAACmIcEGZcg6N-YpWPloK2TUlexXfs&gclid=CjwKCAiA55rJBhByEiwAFkY1QGhRo8MtJY_4xbEuaoTq_yKLpAHmPT0qmmjO42G5qw4Zdt-STneR9hoCjTEQAvD_BwE", label: "Huurwoningen.com" },
                    { url: "https://kamernet.nl/huren/kamer-eindhoven?utm_source=google&utm_medium=cpc&utm_campaign=19678546926&utm_content=648163200608&utm_term=kamer%20huren%20eindhoven&gad_source=1&gad_campaignid=19678546926&gbraid=0AAAAAD4d43qtnpeFWlImGJvI0Rjveebu9&gclid=CjwKCAiA55rJBhByEiwAFkY1QIXdUYxNAc3eIbjSZwVPJxHGYfDGNCjIYpIuztkCdeFZGdQaeyEYWxoCw7cQAvD_BwE", label: "Kamernet.nl" },
                    { url: "https://www.fontys.nl/nieuws/hospi-housing-wordt-platform-voor-studenten-en-hospitas-in-eindhoven/", label: "Fontys Hospi Housing" },
                ],
                transport: "Eindhoven heeft een groot treinstation, veel buslijnen en een internationale luchthaven.",
                highlights: [
                    "Philips Museum",
                    "Strijp-S",
                    "High Tech Campus",
                    "Effenaar",
                    "PSV Stadion"
                ]
            }
        },
        {
            name: "Sittard",
            image: sittardImg,
            info: "Sittard is een rustige, historische stad."
        },
        {
            name: "Venlo",
            image: VenloImg,
            info: "Venlo ligt dicht bij de Duitse grens en heeft veel natuur."
        },
        {
            name: "'s-Hertogenbosch",
            image: denboschImg,
            info: "Bekend om de Bossche bol en historische binnenstad."
        },
        {
            name: "Utrecht",
            image: utrechtImg,
            info: "Utrecht heeft unieke grachten met werfkelders."
        },
    ];

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

    // ⭐ DETAIL SCREEN ⭐
    if (selectedCity) {
        return (
            <div style={styles.container}>
                <button style={styles.backButton} onClick={() => setSelectedCity(null)}>
                    ← Terug
                </button>

                <h1>{selectedCity.name}</h1>

                <img
                    src={selectedCity.image}
                    alt={selectedCity.name}
                    style={styles.detailImage}
                />

                {/* 👉 Only Eindhoven gets expanded info */}
                {typeof selectedCity.info === "string" ? (
                    <p>{selectedCity.info}</p>
                ) : (
                    <div>
                        <h3>Over {selectedCity.name}</h3>
                        <p>{selectedCity.info.intro}</p>

                        <h3>Wonen</h3>
                        <p>{selectedCity.info.housing}</p>

                        {selectedCity.info.housinglink && (
                            <div>
                                <h4>Bekijk beschikbare woningen:</h4>
                                {selectedCity.info.housinglink.map((link, index) => (
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


                        <h3>Vervoer</h3>
                        <p>{selectedCity.info.transport}</p>

                        <h3>Belangrijke plekken</h3>
                        <ul>
                            {selectedCity.info.highlights.map((item) => (
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
            <div style={styles.header}>City Guide & Housing</div>

            <div style={styles.grid}>
                {cities.map((city) => (
                    <div
                        key={city.name}
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
