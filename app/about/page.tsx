export default function About() {
  return (
    <main style={{ minHeight: '100vh', background: '#080d1f', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <nav className="nav-padding" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080d1f' }}>
        <a href="/" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', textDecoration: 'none', color: '#f0f0f0' }}>KATOS</a>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Services', 'Projects', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: l === 'About' ? '#f0f0f0' : '#9ba3c4', textDecoration: 'none', fontWeight: l === 'About' ? 500 : 400 }}>{l}</a>
          ))}
        </div>
      </nav>

      <div className="page-padding" style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 36px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#7b85a8', textTransform: 'uppercase', marginBottom: '16px' }}>About</p>
        <h1 className="hero-text" style={{ fontSize: '42px', fontWeight: 300, color: '#f0f0f0', letterSpacing: '-0.3px', lineHeight: 1.15, marginBottom: '64px', maxWidth: '600px' }}>
          We build digital things<br />that actually work.
        </h1>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '1px' }}>
          <div className="card-padding" style={{ background: '#080d1f', padding: '48px' }}>
            <p style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The studio</p>
            <p style={{ fontSize: '15px', color: '#b8bdd4', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
              Katos is a small digital studio with a big background. We bring enterprise-grade thinking to projects of every size — without the enterprise price tag or the enterprise attitude.
            </p>
          </div>
          <div className="card-padding" style={{ background: '#080d1f', padding: '48px' }}>
            <p style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The philosophy</p>
            <p style={{ fontSize: '15px', color: '#b8bdd4', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
              Most digital work fails not because of bad technology, but because of a gap between what a business needs and what gets built. We close that gap.
            </p>
          </div>
        </div>

        <div className="card-padding" style={{ background: '#080d1f', padding: '48px', marginBottom: '1px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The background</p>
          <p style={{ fontSize: '18px', color: '#c8cde0', lineHeight: 1.7, maxWidth: '640px', margin: 0, fontWeight: 300 }}>
            We&apos;ve spent years building digital platforms at the highest levels — including leading platform strategy at IKEA across 50+ markets. We&apos;ve seen what works at scale, and we apply those patterns to every project we take on.
          </p>
        </div>

        <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '80px' }}>
          {[
            { label: 'Founded', value: '2025' },
            { label: 'Based in', value: 'Malmö, Sweden' },
            { label: 'Approach', value: 'Small team, big thinking' },
          ].map(({ label, value }) => (
            <div className="card-padding" key={label} style={{ background: '#080d1f', padding: '32px' }}>
              <p style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
              <p style={{ fontSize: '16px', color: '#f0f0f0', fontWeight: 500, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="cta-block" style={{ padding: '60px 48px', background: '#0f1630', border: '1px solid rgba(123,156,255,0.15)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '22px', fontWeight: 300, color: '#f0f0f0', lineHeight: 1.4, margin: '0 0 8px' }}>
              Want to work together?
            </p>
            <p style={{ fontSize: '14px', color: '#9ba3c4', margin: 0, fontWeight: 300 }}>Or just say hi — we don&apos;t bite.</p>
          </div>
          <a href="https://cal.com/axel-kindvall-3pe7ih" target="_blank" rel="noreferrer" style={{ padding: '14px 28px', background: '#7b9cff', color: '#080d1f', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Book a call →
          </a>
        </div>
      </div>
    </main>
  )
