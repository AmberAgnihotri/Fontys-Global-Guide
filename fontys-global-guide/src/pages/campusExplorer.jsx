import fontysGebouwEK from "../assets/Fontys Eindhoven Gebouw EK.jpg";
import fontysGebouwES from "../assets/Fontys Eindhoven Gebouw ES.jpg";
import fontysGebouwR from "../assets/Fontys Eindhoven Gebouwen R3 t:m R13.jpg";
import fontysGebouwBIC from "../assets/Fontys Gebouw BIC.jpg";
import fontysGebouwNexus from "../assets/Fontys Gebouw Nexus.jpg";
import fontysGebouwTQ from "../assets/Fontys Gebouw TQ.jpeg";

export default function CampusExplorer() {
  const buildings = [
    {
      name: "Fontys Building EK",
      desc: "Building EK",
      location: "Eindhoven",
      address: "Theo Koomenlaan 3, Eindhoven",
      image: fontysGebouwEK
    },
    {
      name: "Fontys Building ES",
      desc: "Building ES",
      location: "Eindhoven",
      address: "Emmasingel 28, Eindhoven",
      image: fontysGebouwES
    },
    {
      name: "Fontys Buildings R3 to R13",
      desc: "Buildings R3 to R13",
      location: "Eindhoven",
      address: "Rachelsmolen 1, Eindhoven",
      image: fontysGebouwR
    },
    {
      name: "Fontys Building BIC",
      desc: "Business Innovation Center",
      location: "Eindhoven",
      address: "Brainport Industries Campus, Eindhoven",
      image: fontysGebouwBIC
    },
    {
      name: "Fontys Building Nexus",
      desc: "Building Nexus",
      location: "Eindhoven",
      address: "De rondom 1, Eindhoven",
      image: fontysGebouwNexus
    },
    {
      name: "Fontys Building TQ",
      desc: "Building TQ",
      location: "Eindhoven",
      address: "Achtseweg Zuid 151 C, Eindhoven",
      image: fontysGebouwTQ
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Fontys Campus Explorer</h1>
      <p style={{ fontSize: '1.1em', color: '#666', marginBottom: '30px' }}>
        Discover all Fontys buildings
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '30px' 
      }}>
        {buildings.map((building, index) => (
          <div key={index} style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '0.9em', color: '#999', marginBottom: '5px' }}>
              {building.location}
            </p>
            <h2 style={{ marginBottom: '15px' }}>{building.name}</h2>
            <img
              src={building.image}
              alt={building.name}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '10px'
              }}
            />
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              {building.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
