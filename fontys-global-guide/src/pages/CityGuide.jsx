import React, { useState } from "react";

import tilburgImg from "../assets/tilburg.webp";
import eindhovenImg from "../assets/Eindhoven.webp";
import sittardImg from "../assets/sittard.jpg";
import VenloImg from "../assets/Venlo.jpg";
import denboschImg from "../assets/Denbosch.jpg";
import utrechtImg from "../assets/Utrecht.webp";

export default function CityGuide() {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { 
      name: "Tilburg", 
      image: tilburgImg,
      info: {
        about: "Tilburg is the sixth-largest city in the Netherlands with a rich textile heritage. The city is known for the Tilburg Fair (one of the largest fairs in the Benelux) and vibrant cultural life with venues like Poppodium 013.",
        fontys: "Fontys Locations:",
        fontysLocations: [
          "Prof. Goossenslaan 1 - Campus Stappegoor (main location)",
          "Locomotiefboulevard 101 - Mindlabs",
          "Zwijsenplein 1"
        ]
      }
    },
    { 
      name: "Eindhoven", 
      image: eindhovenImg,
      info: {
        about: "Eindhoven is the City of Light and is known for technology, design, and innovation. Home to Philips and PSV, the city has developed into a tech and design hub. The Strijp-S area, a former Philips industrial site, has been transformed into a trendy creative district.",
        housing: "Average rent ranges from €900–€1300 per month, depending on the neighborhood.",
        housingLinks: [
          { url: "https://www.wooniezie.nl", label: "Wooniezie.nl" },
          { url: "https://www.huurwoningen.com/in/eindhoven/", label: "Huurwoningen.com" },
          { url: "https://kamernet.nl/huren/kamer-eindhoven", label: "Kamernet.nl" },
          { url: "https://www.fontys.nl/nieuws/hospi-housing-wordt-platform-voor-studenten-en-hospitas-in-eindhoven/", label: "Fontys Hospi Housing" },
        ],
        transport: "Eindhoven has a large train station, extensive bus network, and an international airport.",
        highlights: [
          "Philips Museum",
          "Strijp-S creative district",
          "High Tech Campus",
          "Effenaar music venue",
          "PSV Stadium"
        ],
        fontys: "Fontys Locations:",
        fontysLocations: [
          "Rachelsmolen 1 - Campus Rachelsmolen (main campus)",
          "Emmasingel 28 - Witte Dame building",
          "De Rondom 1 - Nexus building",
          "Theo Koomenlaan 3",
          "Achtseweg Zuid 151 C"
        ]
      }
    },
    { 
      name: "Sittard", 
      image: sittardImg,
      info: {
        about: "Cozy Limburg city with a beautiful historic center. Known for carnival and Limburg hospitality. Centrally located in Limburg province.",
        fontys: "Fontys Location:",
        fontysLocations: [
          "Mgr. Claessensstraat 4"
        ]
      }
    },
    { 
      name: "Venlo", 
      image: VenloImg,
      info: {
        about: "Border city near Germany, known for horticulture and FloraHolland flower auction. Modern city center after reconstruction. International atmosphere due to its border location.",
        fontys: "Fontys Location:",
        fontysLocations: [
          "Tegelseweg 255 - Campus Venlo (over 50 nationalities)"
        ]
      }
    },
    { 
      name: "'s-Hertogenbosch", 
      image: denboschImg,
      info: {
        about: "Charming capital of Brabant with a beautiful historic center. Famous for Bossche Bollen (chocolate pastries), painter Hieronymus Bosch, and carnival. Cozy city center with canals.",
        fontys: "Fontys Location:",
        fontysLocations: [
          "Frans Fransenstraat 15"
        ]
      }
    },
    { 
      name: "Utrecht", 
      image: utrechtImg,
      info: {
        about: "Fourth largest city in the Netherlands with the iconic Dom Tower and beautiful canals. Vibrant student life and centrally located in the country, making it an ideal base.",
        fontys: "Fontys Location:",
        fontysLocations: [
          "Nieuwegracht 65 (small branch - most programs are in Brabant and Limburg)"
        ]
      }
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
      background: "#663366",
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

  if (selectedCity) {
    const info = selectedCity.info;
    
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => setSelectedCity(null)}>
          ← Back
        </button>

        <h1>{selectedCity.name}</h1>

        <img 
          src={selectedCity.image}
          alt={selectedCity.name}
          style={styles.detailImage}
        />

        <div>
          <h3>About {selectedCity.name}</h3>
          <p>{info.about}</p>

          {info.housing && (
            <>
              <h3>Housing</h3>
              <p>{info.housing}</p>
            </>
          )}

          {info.housingLinks && (
            <div style={{ marginBottom: 20 }}>
              <h4>Find available housing:</h4>
              {info.housingLinks.map((link, index) => (
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

          {info.transport && (
            <>
              <h3>Transportation</h3>
              <p>{info.transport}</p>
            </>
          )}

          {info.highlights && (
            <>
              <h3>Hotspots</h3>
              <ul>
                {info.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <h3>Fontys Locations</h3>
          <p>{info.fontys}</p>
          <ul>
            {info.fontysLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

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