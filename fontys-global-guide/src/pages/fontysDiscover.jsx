import { useState } from 'react';
import '../styles/FontysDiscover.css';

export default function FontysDiscover() {
  const stories = [
    {
      title: "Nathan's Journey",
      text: "Als ICT student ontdekte ik mijn passie voor UI/UX design tijdens een minor project.",
      image: "https://via.placeholder.com/200x250/4A5568/ffffff?text=Nathan"
    },
    {
      title: "Myron's Experience",
      text: "Door Fontys Discover vond ik geweldige stageplekken en maakte ik verbinding met bedrijven.",
      image: "https://via.placeholder.com/200x250/4A5568/ffffff?text=Myron"
    },
    {
      title: "Shirin's Story",
      text: "De campus events hielpen me om nieuwe vrienden te maken en mijn netwerk uit te breiden.",
      image: "https://via.placeholder.com/200x250/4A5568/ffffff?text=Shirin"
    }
  ];

  return (
    <div className="fontys-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
      </div>

      {/* Main Content Container */}
      <div className="main-content">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="main-title">Fontys Discovery</h1>
          <p className="subtitle">
            Hier komt tekst over fontys
          </p>
        </div>

        {/* Three Cards Section */}
        <div className="cards-container">
          {stories.map((story, index) => (
            <div key={index} className="story-card">
              {/* Card Image Area */}
              <div className="card-image-section">
                <div className="image-frame">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="story-image"
                  />
                </div>
              </div>
              
              {/* Card Text Area */}
              <div className="card-text-section">
                <h3 className="story-title">{story.title}</h3>
                <p className="story-text">{story.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="buttons-container">
          <button 
            className="action-button"
            onClick={() => alert('Navigating to Expense Tracker...')}
          >
            EXPENSE TRACKER
          </button>
          <button 
            className="action-button"
            onClick={() => alert('Navigating to Campus Explorer...')}
          >
            CAMPUS EXPLORER
          </button>
        </div>
      </div>
    </div>
  );
}