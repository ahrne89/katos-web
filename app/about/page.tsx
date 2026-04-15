export default function About() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f3ef', fontFamily: 'var(--font-geist-sans)' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', borderBottom: '1px solid #e8e5e0', background: '#f5f3ef' }}>
        <a href="/" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textDecoration: 'none', color: '#1a1a1a' }}>KATOS</a>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Services', 'Projects', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: l === 'About' ? '#1a1a1a' : '#888', textDecoration: 'none', fontWeight: l === 'About' ? 500 : 400 }}>{l}</a>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 36px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#aaa', textTransform: 'uppercase', marginBottom: '16px' }}>About</p>
        <h1 style={{ fontSize: '42px', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: '64px', maxWidth: '600px' }}>
          We build digital things<br />that actually work.
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>
          <div style={{ background: '#fff', padding: '48px' }}>
            <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The studio</p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, margin: 0 }}>
              Katos is a small digital studio with a big background. We bring enterprise-grade thinking to projects of every size — without the enterprise price tag or the enterprise attitude.
            </p>
          </div>
          <div style={{ background: '#fff', padding: '48px' }}>
            <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The philosophy</p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, margin: 0 }}>
              Most digital work fails not because of bad technology, but because of a gap between what a business needs and what gets built. We close that gap.
            </p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '48px', marginBottom: '2px' }}>
          <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>The background</p>
          <p style={{ fontSize: '18px', color: '#1a1a1a', lineHeight: 1.7, maxWidth: '640px', margin: 0, fontWeight: 400 }}>
            We&apos;ve spent years building digital platforms at the highest levels — including leading platform strategy at IKEA across 50+ markets. We&apos;ve seen what works at scale, and we apply those patterns to every project we take on.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '80px' }}>
          {[
            { label: 'Founded', value: '2025' },
            { label: 'Based in', value: 'Malmö, Sweden' },
            { label: 'Approach', value: 'Small team, big thinking' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#fff', padding: '32px' }}>
              <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
              <p style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: 500, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '60px 48px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '22px', fontWeight: 400, color: '#fff', lineHeight: 1.4, margin: '0 0 8px' }}>
              Want to work together?
            </p>
            <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>Or just say hi — we don&apos;t bite.</p>
          </div>
          <a href="https://cal.com/axel-kindvall-3pe7ih" target="_blank" rel="noreferrer" style={{ padding: '14px 28px', background: '#fff', color: '#1a1a1a', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
            Book a call →
          </a>
        </div>
      </div>
    </main>
  )
}