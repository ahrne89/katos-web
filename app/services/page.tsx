export default function Services() {
  const services = [
    {
      number: '01',
      title: 'Websites',
      tagline: 'Your business deserves better than a template.',
      body: 'We build custom websites that are fast, clean, and designed to convert. Integrated with Shopify, booking systems, CMS platforms, or whatever your business actually needs. Built properly from the start so they don\'t need rebuilding in 18 months.',
      for: 'Small businesses, local service providers, startups',
    },
    {
      number: '02',
      title: 'AI agents',
      tagline: 'Your best employee — available 24/7, never calls in sick.',
      body: 'Kato-style chat agents trained on your services, your tone, your customers. Handles enquiries around the clock, guides visitors, books appointments, and qualifies leads — without you lifting a finger. We build it, we maintain it, you never think about it.',
      for: 'Any business tired of missing enquiries and repeating themselves',
    },
    {
      number: '03',
      title: 'AI consulting',
      tagline: 'Cut through the hype. Find what actually works.',
      body: 'Most companies are either ignoring AI or throwing money at the wrong things. We help you figure out where it genuinely adds value — and where it doesn\'t. Strategy, hands-on implementation, and honest advice from people who\'ve done it at scale.',
      for: 'Companies that know AI matters but don\'t know where to start',
    },
    {
      number: '04',
      title: 'Integrations',
      tagline: 'Your tools should work together. Most don\'t.',
      body: 'We connect systems that should already talk to each other. Shopify integrations, API work, headless CMS, performance optimisation. If your tech stack is held together with duct tape and spreadsheets, we can fix that.',
      for: 'Businesses with existing tech that needs to work harder',
    },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#080d1f', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <nav className="nav-padding" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#080d1f' }}>
        <a href="/" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', textDecoration: 'none', color: '#f0f0f0' }}>KATOS</a>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Services', 'Projects', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: l === 'Services' ? '#f0f0f0' : '#9ba3c4', textDecoration: 'none', fontWeight: l === 'Services' ? 500 : 400 }}>{l}</a>
          ))}
        </div>
      </nav>

      <div className="page-padding" style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 36px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#7b85a8', textTransform: 'uppercase', marginBottom: '16px' }}>Services</p>
        <h1 className="hero-text" style={{ fontSize: '42px', fontWeight: 300, color: '#f0f0f0', letterSpacing: '-0.3px', lineHeight: 1.15, marginBottom: '80px', maxWidth: '600px' }}>
          Four things we do.<br />All of them well.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
          {services.map((s, i) => (
            <div key={i} className="two-col card-padding" style={{ background: '#080d1f', padding: '48px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em' }}>{s.number}</span>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#f0f0f0', margin: '12px 0 8px' }}>{s.title}</h2>
                <p style={{ fontSize: '13px', color: '#7b9cff', fontStyle: 'italic', margin: 0, fontWeight: 300 }}>{s.tagline}</p>
              </div>
              <div>
                <p style={{ fontSize: '15px', color: '#b8bdd4', lineHeight: 1.7, marginBottom: '20px', fontWeight: 300 }}>{s.body}</p>
                <p style={{ fontSize: '12px', color: '#7b85a8', margin: 0 }}>For: {s.for}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-block" style={{ marginTop: '80px', padding: '60px 48px', background: '#0f1630', border: '1px solid rgba(123,156,255,0.15)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <p style={{ fontSize: '22px', fontWeight: 300, color: '#f0f0f0', maxWidth: '400px', lineHeight: 1.4, margin: 0 }}>
            Every project starts with a conversation.
          </p>
          <a href="https://cal.com/axel-kindvall-3pe7ih" target="_blank" rel="noreferrer" style={{ padding: '14px 28px', background: '#7b9cff', color: '#080d1f', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Book a call →
          </a>
        </div>
      </div>
    </main>
  )
}