export default function HelpCenter() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      maxWidth: '428px',
      margin: '0 auto',
      border: '4px solid black',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif' // Consistent lettertype
    }}>
      
      {/* Navigation Bar */}
      <div style={{
        padding: '16px',
        color: 'Black',
        fontWeight: 'bold',
        fontSize: '24px', // Groter dan Top 10 FAQ's
        borderBottom: '4px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Help Center
      </div>

      {/* Page Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        fontSize: '16px',
        color: '#374151',
        lineHeight: '1.6'
      }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '12px' }}>
          Top 10 FAQ's for International Students
        </h2>

        <ol style={{ paddingLeft: '20px' }}>
          {/* FAQ Items */}
          <li style={{ marginBottom: '12px' }}>
            <strong>What are the admission requirements and what English language level do I need?</strong><br/>
            For admission to Fontys, you need a diploma equivalent to the Dutch havo diploma. For English-taught programs, you need an IELTS score of 6.0 (with minimum 5.5 per component) or TOEFL iBT score of 80.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>How much is the tuition fee and what are the living costs?</strong><br/>
            Tuition fees for non-EEA students are approximately €9,000-€10,000 per year. For living expenses, you should budget €800-€1,200 per month, depending on your lifestyle and whether you live in a shared room or studio.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>Do I need a visa or residence permit?</strong><br/>
            Students from outside the EU/EEA need a residence permit (MVV). Fontys acts as a recognized sponsor and helps with the application process. EU/EEA students only need to register with the municipality.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>Can I work during my studies?</strong><br/>
            Non-EU students can work up to 16 hours per week during the academic year, or full-time in June, July, and August. EU students don't need a work permit and can work unlimited hours.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>How do I find suitable housing in Eindhoven or other cities?</strong><br/>
            Fontys offers limited student housing, primarily for first-year students. You can also search through platforms like Kamernet, Room.nl, and Facebook groups. Start your search early as the housing market is tight.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>Do I need health insurance in the Netherlands?</strong><br/>
            Yes, health insurance is mandatory for everyone living in the Netherlands. International students must arrange Dutch health insurance (approximately €100-€120 per month) or prove they have equivalent coverage.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>What is the teaching style and study culture like at Fontys?</strong><br/>
            Fontys uses a practical, project-based learning approach with small group work, interactive classes, and real-world assignments. The atmosphere is informal - students call teachers by their first name and active participation is expected.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>When should I apply and what are the deadlines?</strong><br/>
            Application deadlines vary by program. For non-EU students, the deadline is typically May 1st for programs starting in September. EU students often have until August. Check specific program deadlines as they may differ.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>What support services are available for international students?</strong><br/>
            Fontys offers various support services including an International Office, buddy programs, orientation weeks, academic counseling, career services, and mental health support through student psychologists.
          </li>

          <li style={{ marginBottom: '12px' }}>
            <strong>How do I open a Dutch bank account and arrange other practicalities?</strong><br/>
            You can open a bank account with your passport, proof of enrollment, and proof of address. Popular student banks include ING, ABN AMRO, and Rabobank. You'll also need to register with the municipality (gemeente) within 5 days of arrival and arrange a BSN (citizen service number).
          </li>
        </ol>

        {/* Contact Section */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          borderTop: '2px solid #ccc',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Contact Information</h3>
          <p>Email: <a href="mailto:Klantcontactcentrum@fontys.nl" style={{ color: '#663366', textDecoration: 'underline' }}>Klantcontactcentrum@fontys.nl</a></p>
          <p>Phone: 08850 80000 </p>
          <p>Address: Prof. Goossenslaan 1, 5022 DM Tilburg</p>
        </div>
      </div>
    </div>
  );
}
