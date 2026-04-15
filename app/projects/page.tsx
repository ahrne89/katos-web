export default function Projects() {
  const projects = [
    {
      number: '01',
      title: 'Kato — hiring agent',
      tags: ['AI agent', 'Next.js', 'Claude API'],
      desc: 'A fully autonomous hiring assistant that handles recruiter conversations, answers questions about the candidate\'s background, and books calls when needed. Built in a single session. The agent knows when to answer and when to escalate — and does both gracefully.',
      outcome: 'Live at job-agent.vercel.app. Zero recruiter touchpoints needed for initial screening.',
      status: 'Live',
    },
    {
      number: '02',
      title: 'Katos.dev — this site',
      tags: ['Next.js', 'AI agent', 'Vercel'],
      desc: 'The site you\'re on. Built as both a product and a demo — Kato is simultaneously the face of the business and proof that the technology works. The entire stack from idea to live took one afternoon.',
      outcome: 'The fastest way to show what we do is to show it working.',
      status: 'Live',
    },
    {
      number: '03',
      title: 'More coming',
      tags: ['In progress'],
      desc: 'We\'re selective about what we build and who we build it for. Every project on this page will be something we\'re genuinely proud of — not a portfolio filler.',
      outcome: 'Working on something interesting? Let\'s talk.',
      status: 'Soon',
    },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#f5f3ef', fontFamily: 'var(--font-geist-sans)' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', borderBottom: '1px solid #e8e5e0', background: '#f5f3ef' }}>
        <a href="/" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textDecoration: 'none', color: '#1a1a1a' }}>KATOS</a>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Services', 'Projects', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: l === 'Projects' ? '#1a1a1a' : '#888', textDecoration: 'none', fontWeight: l === 'Projects' ? 500 : 400 }}>{l}</a>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 36px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#aaa', textTransform: 'uppercase', marginBottom: '16px' }}>Projects</p>
        <h1 style={{ fontSize: '42px', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: '80px', maxWidth: '560px' }}>
          Things we&apos;ve built.<br />And why they exist.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: '#fff', padding: '48px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em' }}>{p.number}</span>
                <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#1a1a1a', margin: '12px 0 12px' }}>{p.title}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: '11px', padding: '3px 10px', background: '#f5f3ef', color: '#888', borderRadius: '20px' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>
                <p style={{ fontSize: '13px', color: '#9a6e4a', margin: 0, fontStyle: 'italic' }}>{p.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}