export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 52%, #ffffff 0%, #f0eeea 60%, #e8e5e0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-geist-sans)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <nav style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 36px',
      }}>
        <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em' }}>KATOS</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Services', 'Projects', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', marginTop: '32px' }}>
        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="orb-glow" />
          <div className="orb-mid" />
          <div className="orb-core" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '28px' }}>
          {[0, 0.11, 0.22, 0.33, 0.44, 0.33, 0.22, 0.11, 0].map((delay, i) => (
            <div key={i} className="wave-bar" style={{ animationDelay: `${delay}s` }} />
          ))}
        </div>

        <span style={{ fontSize: '13px', letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase' }}>Kato</span>

        <p style={{ fontSize: '16px', lineHeight: 1.75, textAlign: 'center', maxWidth: '340px', color: '#1a1a1a' }}>
          I'm Kato — how can I help you today?
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '360px', borderBottom: '1px solid rgba(0,0,0,0.12)', paddingBottom: '10px' }}>
          <input placeholder="Say something..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'inherit' }} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a6e4a', fontSize: '16px' }}>→</button>
        </div>

        <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.06em' }}>or explore ↓</span>
      </div>
    </main>
  )
}