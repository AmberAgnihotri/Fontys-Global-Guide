import { useState } from "react";
import { useTranslation } from "react-i18next";
// import checklistPdf from "../../assets/checklist.pdf";
import "../styles/Administration.css";

export default function Administration() {
  const [showPDF, setShowPDF] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-info">
            {t("administration.info")}
          </div>
        </div>

        {/* Button at the Bottom */}
        <button onClick={() => setShowPDF(true)} className="admin-button">
          {t("administration.checklist")}
        </button>
      </div>

      {showPDF && (
        <div className="pdf-overlay">
          {/* Back Button */}
          <button onClick={() => setShowPDF(false)} className="back-button">
            ← {t("administration.back")}
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
              {t("administration.openPdf")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
