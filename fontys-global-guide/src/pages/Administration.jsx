import { useState } from "react";
import checklistPdf from "../assets/checklist.pdf";
 
// Afbeeldingen importeren
import imgAdmission from '../assets/admission_application.png';
import imgVisa from '../assets/visa_residentspermmit.jpg';
import imgHousing from '../assets/housing_picture.jpg';
import imgStudyIntheNetherlands from '../assets/StudyIntheNetherlands.png';
 
// PDFs importeren
import AdmissionAndApplicationPdf from '../assets/Guide1.pdf';
import VisaAndResidentspermitPdf from '../assets/Guide2.pdf';
import HousingPdf from '../assets/Guide3.pdf';
import StudyInThNetherlandsPdf from '../assets/Guide4.pdf';
 
export default function Administration() {
  const [showPDF, setShowPDF] = useState(null);
 
  const pdfButtons = [
    {
      title: 'Admission & Application',
      image: imgAdmission,
      pdf: AdmissionAndApplicationPdf,
      color: '#663366'
    },
    {
      title: 'Visa & Residence Permit',
      image: imgVisa,
      pdf: VisaAndResidentspermitPdf,
      color: '#663366'
    },
    {
      title: 'Housing',
      image: imgHousing,
      pdf: HousingPdf,
      color: '#663366'
    },
    {
      title: 'Study in the Netherlands',
      image: imgStudyIntheNetherlands,
      pdf: StudyInThNetherlandsPdf,
      color: '#663366'
    }
  ];
 
  const handleImageButtonClick = (button) => {
    if (button.pdf) {
      setShowPDF(button.pdf);   // FIX: toon alleen de PDF URL
    } else {
      alert(`${button.title} PDF is not available. Upload the file first!`);
    }
  };
 
  // PDF VIEWER
  if (showPDF) {
    return (
<div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}>
<button
          onClick={() => setShowPDF(null)}
          style={{
            padding: '12px 20px',
            border: '3px solid black',
            backgroundColor: '#663366',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '20px',
            alignSelf: 'flex-start'
          }}
>
          ← Back
</button>
 
        <iframe
          src={showPDF}
          title="PDF Viewer"
          style={{
            flex: 1,
            border: 'none',
            width: '100%',
            height: '100%'
          }}
        />
 
        <div style={{
          padding: '20px',
          textAlign: 'center'
        }}>
<a
            href={showPDF}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#663366',
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}
>
            Open PDF in new window
</a>
</div>
</div>
    );
  }
 
  // MAIN PAGE
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
        {/* Page Content */}
<div style={{
          padding: '24px',
          paddingBottom: '12px'
        }}>
<h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'black',
            marginBottom: '12px',
            marginLeft: '100px',
          }}>
            Administration
</h1>
<div style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: '1.6'
          }}>
            On this page, you will find all the essential administrative information you need to prepare for your studies at Fontys. It includes four key topics presented in clear and organized guides: Admission & Application, Visa & Residence Permit, Housing, and Study in the Netherlands. Each guide provides step-by-step instructions and reliable resources, helping you understand exactly what to arrange before and during your stay in the Netherlands. This way, we support you in starting your study journey at Fontys without stress.
</div>
</div>
 
        {/* 4 PDF Image Buttons */}
<div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
<div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            width: '100%',
            maxWidth: '350px'
          }}>
            {pdfButtons.map((button, index) => (
<div
                key={index}
                onClick={() => handleImageButtonClick(button)}
                style={{
                  border: '4px solid black',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
>
                {/* Icon/Image Area */}
<div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  backgroundColor: '#f9fafb',
                  overflow: 'hidden'
                }}>
                  {button.image ? (
<img
                      src={button.image}
                      alt={button.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    button.icon
                  )}
</div>
                {/* Titel Bar */}
<div style={{
                  padding: '8px',
                  backgroundColor: button.color,
                  textAlign: 'center',
                  borderTop: '4px solid black'
                }}>
<span style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    {button.title}
</span>
</div>
</div>
            ))}
</div>
</div>
 
        {/* Checklist Button */}
<div style={{
          padding: '16px'
        }}>
<button
            onClick={() => setShowPDF(checklistPdf)}
            style={{
              width: '100%',
              padding: '14px',
              border: '4px solid black',
              backgroundColor: '#663366',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7d4d7d'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#663366'}
>
            Checklist
</button>
</div>
 
      </div>
</div>
  );
}