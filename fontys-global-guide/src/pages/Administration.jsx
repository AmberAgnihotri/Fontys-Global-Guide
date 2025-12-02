import { useState } from "react";
// import checklistPdf from "../../assets/checklist.pdf";
import "../styles/Administration.css"; // Import the CSS file

export default function Administration() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <>
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-info">
            Op deze pagina komt de administratie. Hier staat wat een
            internationale student moet regelen voordat die in Nederland komt
            studeren.
          </div>
        </div>

        {/* Button at the Bottom */}
        <button onClick={() => setShowPDF(true)} className="admin-button">
          Checklist
        </button>
      </div>

      {showPDF && (
        <div className="pdf-overlay">
          {/* Back Button */}
          <button onClick={() => setShowPDF(false)} className="back-button">
            ← Terug
          </button>

          {/* PDF iframe */}
          <iframe
            src={checklistPdf}
            title="Checklist PDF"
            className="pdf-iframe"
          />

          {/* Fallback Link */}
          <div className="fallback-link">
            <a href={checklistPdf} target="_blank" rel="noreferrer">
              Open PDF in nieuw tabblad
            </a>
          </div>
        </div>
      )}
    </>
  );
}