export default function Footer() {
  return (
    <footer style={{
      background: '#080b18',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '24px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff' }}>
        SJ
      </span>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Outfit',sans-serif" }}>
        © 2025 Sourabh Joshi · Frontend Developer
      </p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Outfit',sans-serif" }}>
        Uttarakhand, India
      </p>
    </footer>
  );
}
