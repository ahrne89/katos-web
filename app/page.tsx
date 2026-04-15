'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: string
  content: string
  showCTA?: boolean
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const exploreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setChatOpen(true)
    try {
      const res = await fetch('/api/katos-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      })
      const data = await res.json()
      if (data.error) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.error }])
      } else {
        const raw: string = data.reply
        const showCTA = raw.includes('[BOOK_CTA]')
        const content = raw.replace('[BOOK_CTA]', '').trim()
        setMessages([...updatedMessages, { role: 'assistant', content, showCTA }])
      }
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const services = [
    { number: '01', title: 'Websites', desc: 'Fast, clean, built to convert. Integrated with the tools your business actually uses.', href: '/services' },
    { number: '02', title: 'AI agents', desc: 'Like Kato — but for your business. Handles enquiries 24/7 so you don\'t have to.', href: '/services' },
    { number: '03', title: 'AI consulting', desc: 'We help you figure out where AI adds value — and where it doesn\'t. No hype.', href: '/services' },
    { number: '04', title: 'Integrations', desc: 'Shopify, APIs, headless CMS. Connecting systems that should already talk to each other.', href: '/services' },
  ]

  return (
    <>
      <main style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #111b3a 0%, #080d1f 65%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: Math.random() > 0.8 ? '2px' : '1px',
              borderRadius: '50%',
              background: '#fff',
              opacity: Math.random() * 0.5 + 0.1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }} />
          ))}
        </div>

        <nav className="nav-padding" style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', color: '#f0f0f0' }}>KATOS</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Services', 'Projects', 'About'].map(l => (
              <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: '#9ba3c4', textDecoration: 'none', fontWeight: 400, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9ba3c4')}
              >{l}</a>
            ))}
          </div>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', marginTop: '32px', width: '100%', maxWidth: '480px', padding: '0 24px', position: 'relative', zIndex: 1 }}>
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

          <span style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#9ba3c4', textTransform: 'uppercase', fontWeight: 400 }}>Kato</span>

          <p style={{ fontSize: '16px', lineHeight: 1.8, textAlign: 'center', maxWidth: '340px', color: '#c8cde0', fontWeight: 300 }}>
            I&apos;m Kato — how can I help you today?
          </p>

          {chatOpen && (
            <div style={{ width: '100%', maxHeight: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px 0' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                  <div style={{
                    maxWidth: '85%', padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: '14px', lineHeight: '1.6', fontWeight: 300,
                    background: m.role === 'user' ? '#1e2a52' : 'rgba(255,255,255,0.06)',
                    color: m.role === 'user' ? '#e0e8ff' : '#c8cde0',
                    border: m.role === 'user' ? '1px solid rgba(123,156,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
                  }}>
                    {m.content}
                  </div>
                  {m.showCTA && (
                    <a href="https://cal.com/axel-kindvall-3pe7ih" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: '#7b9cff', color: '#080d1f', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                      Book a call →
                    </a>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7b9cff', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Say something..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'inherit', color: '#f0f0f0', fontWeight: 300 }}
            />
            <button onClick={send} disabled={loading} style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: '#7b9cff', fontSize: '16px', opacity: loading ? 0.4 : 1, transition: 'opacity 0.2s' }}>→</button>
          </div>

          <span onClick={() => exploreRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.08em', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#9ba3c4')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7b85a8')}
          >or explore ↓</span>
        </div>
      </main>

      {/* Explore section */}
      <section ref={exploreRef} style={{ background: '#080d1f', padding: '100px 36px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#7b85a8', textTransform: 'uppercase', marginBottom: '16px' }}>What we do</p>
          <h2 className="hero-text" style={{ fontSize: '36px', fontWeight: 300, color: '#f0f0f0', letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '64px', maxWidth: '560px' }}>
            We build the digital layer that makes businesses work better.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {services.map((s, i) => (
              <a key={i} href={s.href} style={{ textDecoration: 'none', background: '#080d1f', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f1630')}
                onMouseLeave={e => (e.currentTarget.style.background = '#080d1f')}
              >
                <span style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.1em' }}>{s.number}</span>
                <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#f0f0f0', margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#9ba3c4', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{s.desc}</p>
                <span style={{ fontSize: '12px', color: '#7b9cff', marginTop: 'auto', paddingTop: '16px' }}>Learn more →</span>
              </a>
            ))}
          </div>

          <div className="cta-block" style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
            <p style={{ fontSize: '20px', fontWeight: 300, color: '#c8cde0', maxWidth: '400px', lineHeight: 1.5, margin: 0 }}>
              Not sure where to start? Kato can help figure that out.
            </p>
            <a href="https://cal.com/axel-kindvall-3pe7ih" target="_blank" rel="noreferrer" style={{ padding: '14px 28px', background: '#7b9cff', color: '#080d1f', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Book a call →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}