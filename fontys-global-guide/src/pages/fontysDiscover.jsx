import { useState } from 'react';


import imgNathan from '../assets/Man-silliout-pasfoto1.jpg';
import imgMyron from '../assets/Man-silliout-pasfoto2.jpg';
import imgShirin from '../assets/Vrouw-silliouet-pasfoto.jpg';
import { useNavigate } from "react-router-dom";


export default function FontysDiscover() {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      title: "Nathan's Journey",
      preview: "'The Island Traveler' Age: 22 years old, from Sint Maarten. Studies: Software Engineering at Fontys Tilburg Since: 2024...",
      fullText: "From the Caribbean island of Sint Maarten to the Netherlands - what a journey! It took almost half a year just to find a room via sites like Kamernet. Only in my last month before departure did I understand that I HAD to have health insurance - nobody had told me that! Fortunately I had friends here who helped me with the process. In the Caribbean some things are more expensive (insurance), but food here is sometimes ridiculously expensive. I want to first learn software engineering and then grow into AI. My advice: make sure you arrange your insurance early, find your housing before you come, and register everything with the municipality immediately. Oh, and get your driver's license-ID in order!' Biggest challenge: Discovered insurance requirement late + long housing search What helped: Friends with experience, online research Financing: Mix (still figuring it out).",
      image: imgNathan
    },
    {
      title: "Myron's Experience",
      preview: "'The Commuter Pioneer' Age: 24 years old, from Aruba 🇦🇼. Studies: ICT at Fontys Eindoven Since: 2021...",
      fullText: "I came from Aruba to the Netherlands in 2021 for a better future. First I did my MBO in Gouda, then I looked for the best HBO and ended up at Fontys. The hardest part? The language. I doubted whether my Dutch was good enough, so I started working at MediaMarkt to practice. Now I commute an hour daily from The Hague to Tilburg - not ideal, but finding housing is difficult. Through an Aruban association I got an apartment in 6-12 months for €800/month. My biggest tip: just dare! You'll encounter obstacles, but think of your goal. And arrange your housing FIRST, that takes the most time. Biggest challenge: Finding housing + learning the language What helped: Aruban association, working alongside studies Financing: DUO + part-time job MediaMarkt + benefits.",
      image: imgMyron
    },
    {
      title: "Shirin's Story",
      preview: "'The Self-Made Student' Age: 19 years old, from Syria sy. Studies: AI at Fontys Eindoven Since: 2024...",
      fullText: "I dreamed of studying AI in the Netherlands. After research, Fontys came out as the best. A woman from the municipality helped me enormously - from diploma evaluation (my Syrian diploma was rated HBO level 5!) to registration via Studielink. I learned Dutch completely by myself via Duolingo, YouTube and Dutch news. Now I can understand it, but speaking is still difficult. The municipality also helped me find a room in Strijp-S. My biggest wish? A ChatGPT-like AI specifically for Fontys where I can ask all requirements and info. My tips: learn Dutch immediately, ask for help often, and arrange your housing BEFORE you come! Biggest challenge: Language + diploma evaluation from Syria What helped: Municipality guidance, self-learning Dutch online Financing: DUO fully",
      image: imgShirin
    }
  ];

  const handleCardClick = (index) => {
    console.log('Card clicked:', index);
    setSelectedStory(index);
  };

  const handleBackClick = () => {
    console.log('Back clicked');
    setSelectedStory(null);
  };

  // DETAIL PAGINA
  if (selectedStory !== null) {
    const story = stories[selectedStory];
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        maxWidth: '428px',
        margin: '0 auto'
      }}>
        <div style={{
          border: '4px solid black',
          minHeight: '100vh',
          padding: '20px'
        }}>
          <button
            onClick={handleBackClick}
            style={{
              padding: '8px 16px',
              border: '3px solid black',
              backgroundColor: '#663366',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '20px'
            }}
          >
            ← BACK
          </button>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '150px',
              height: '180px',
              border: '3px solid black',
              margin: '0 auto',
              backgroundColor: '#f9fafb'
            }}>
              <img
                src={story.image}
                alt={story.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {story.title}
          </h2>

          <div style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#374151'
          }}>
            {story.fullText}
          </div>
        </div>
      </div>
    );
  }

  // HOOFD PAGINA
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      maxWidth: '428px',
      margin: '0 auto'
    }}>
      <div style={{
        border: '4px solid black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Titel */}
        <div style={{
          padding: '24px',
          textAlign: 'center',
          borderBottom: '2px solid black'
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}>
            Fontys Discovery
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#374151'
          }}>
            Fontys University of Applied Sciences is one of the largest universities of applied sciences in the Netherlands and offers a wide range of English-taught and practice-oriented programmes. As an international student, you enter a welcoming, inclusive and multicultural community where personal attention and small-scale learning environments help you feel at home quickly. Fontys focuses strongly on learning by doing: students work on real projects, collaborate with professionals and gain practical experience that prepares them for an international career. Across its various campuses, Fontys provides modern facilities, supportive guidance and plenty of opportunities to grow both personally and professionally.
          </p>
        </div>

        {/* Story Cards */}
        <div style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {stories.map((story, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                border: '4px solid black',
                display: 'flex',
                height: '120px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {/* Foto */}
              <div style={{
                width: '100px',
                borderRight: '4px solid black',
                backgroundColor: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}>
                <div style={{
                  width: '70px',
                  height: '84px',
                  border: '2px solid black',
                  backgroundColor: 'white'
                }}>
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Tekst */}
              <div style={{
                flex: 1,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginBottom: '6px'
                }}>
                  {story.title}
                </h3>
                <p style={{
                  fontSize: '11px',
                  color: '#374151',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {story.preview}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '16px'
        }}>
          <button
            onClick={() => navigate("/expense-tracker")}
            style={{
              flex: 1,
              border: '4px solid black',
              padding: '14px',
              backgroundColor: '#663366',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#663366'}
          >
            EXPENSE TRACKER
          </button>
          <button
            onClick={() => navigate("/campus-explorer")}
            style={{
              flex: 1,
              border: '4px solid black',
              padding: '14px',
              backgroundColor: '#663366',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#663366'}
          >
            CAMPUS EXPLORER
          </button>
        </div>
      </div>
    </div>
  );
}