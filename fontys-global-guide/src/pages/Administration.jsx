import { useState } from "react";

import checklistPdf from "../../assets/checklist.pdf";
 
export default function ChecklistPage() {

  const [showPDF, setShowPDF] = useState(false);
 
  return (
<>

      {/* Knop op de normale pagina */}
<div className="min-h-screen flex flex-col bg-white">
 
  {/* Page content */}
<div className="flex-1 flex items-center justify-center px-6">
<div className="bg-purple-800 text-black p-6 rounded-xl max-w-md text-center">
      op deze pagina komt de administratie hier op staat dan wat een
      internationale student moet regelen voor dat die in Nederland komt
      studeren
</div>
</div>
 
  {/* Button onderaan */}"
<button
      onClick={() => setShowPDF(true)}
      className="px-10 py-52 bg-purple-800 text-black rounded-md"
>
      Checklist
</button>
</div>
 

 
      {/* FULLSCREEN SCROLLBARE OVERLAY */}

      {showPDF && (
<div

          style={{

            position: "fixed",

            top: 0,

            left: 0,

            width: "100vw",

            height: "100vh",

            zIndex: 9999,

            backgroundColor: "white",

            overflowY: "auto", // <-- SCROLL ENABLED!

          }}
>

          {/* Terug knop */}
<button

            onClick={() => setShowPDF(false)}

            style={{

              position: "fixed",

              top: 16,

              left: 16,

              zIndex: 10000,

              background: "#1f2937",

              color: "white",

              padding: "10px 16px",

              borderRadius: "8px",

              border: "none",

              cursor: "pointer",

              fontSize: "16px",

            }}
>

            ← Terug
</button>
 
          {/* PDF iframe - hoogte automatisch zodat scroll werkt */}
<iframe

            src={checklistPdf}

            title="Checklist PDF"

            style={{

              width: "100%",

              height: "100vh",

              border: "none",

              marginTop: "60px", // zodat het niet onder de terug-knop valt

            }}

          />
 
          {/* Fallback link */}
<div

            style={{

              width: "100%",

              textAlign: "center",

              padding: "20px",

            }}
>
<a

              href={checklistPdf}

              target="_blank"

              rel="noreferrer"

              style={{ color: "#2563eb", textDecoration: "underline" }}
>

              Open PDF in nieuw tabblad
</a>
</div>
</div>

      )}
</>

  );

}

 