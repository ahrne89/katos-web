'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: string
  content: string
  showCTA?: boolean
}

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [sessionId] = useState(() => generateSessionId())
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const exploreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [chatOpen])

  const scrollChat = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 50)
  }

  const send = async (text?: string) => {
    const content = text || input
    if (!content.trim() || loading) return
    const userMessage: Message = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setChatOpen(true)
    scrollChat()
    try {
      const res = await fetch('/api/katos-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId,
        })
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
      scrollChat()
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
      scrollChat()
    }
    setLoading(false)
  }

  const suggestions = [
    'Automate customer support',
    'Build me a website',
    'Connect my tools',
  ]

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
        background: '#080d1f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <nav className="nav-padding" style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', zIndex: 10 }}>
          <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', color: '#f0f0f0' }}>KATOS</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Services', 'Projects', 'About'].map(l => (
              <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: '#9ba3c4', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', width: '100%', maxWidth: '560px', padding: '0 20px', position: 'relative', zIndex: 1, marginTop: '60px' }}>

          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(123,156,255,0.55)', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'Inter, sans-serif' }}>Kato</p>

          <h1 className="hero-text" style={{ fontSize: '32px', fontWeight: 300, color: '#f0f0f0', margin: '0 0 10px', letterSpacing: '-0.3px', lineHeight: 1.25, textAlign: 'center' }}>
            We build AI systems that<br />automate your business
          </h1>

          <p style={{ fontSize: '14px', color: '#9ba3c4', fontWeight: 300, margin: '0 0 0px', textAlign: 'center' }}>
            Talk to Kato to explore your use case
          </p>

          {/* Orb image */}
          <div style={{ position: 'relative', width: '300px', height: '300px', margin: '-20px 0 -20px' }}>
            <img
              src="/orb.jpg"
              alt="Kato AI"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                mixBlendMode: 'lighten',
              }}
            />
            <span style={{ position: 'absolute', top: '52px', left: '10px', fontSize: '12px', color: 'rgba(160,185,255,0.7)', fontFamily: 'Inter,sans-serif', letterSpacing: '0.04em' }}>Automate</span>
            <span style={{ position: 'absolute', top: '52px', right: '10px', fontSize: '12px', color: 'rgba(160,185,255,0.7)', fontFamily: 'Inter,sans-serif', letterSpacing: '0.04em' }}>Analyze</span>
            <span style={{ position: 'absolute', bottom: '60px', right: '5px', fontSize: '12px', color: 'rgba(160,185,255,0.7)', fontFamily: 'Inter,sans-serif', letterSpacing: '0.04em' }}>Integrate</span>
            <span style={{ position: 'absolute', bottom: '60px', left: '10px', fontSize: '12px', color: 'rgba(160,185,255,0.7)', fontFamily: 'Inter,sans-serif', letterSpacing: '0.04em' }}>Scale</span>
          </div>

          {/* Chat messages */}
          {chatOpen && (
            <div
              ref={chatContainerRef}
              style={{
                width: '100%',
                height: '36vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '4px 0 8px',
                marginBottom: '8px',
              }}
            >
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                  <div style={{
                    maxWidth: '85%', padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: '14px', lineHeight: '1.6', fontWeight: 300,
                    background: m.role === 'user' ? '#1e2a52' : 'rgba(255,255,255,0.06)',
                    color: m.role === 'user' ? '#e0e8ff' : '#d8ddf0',
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
            </div>
          )}

          {/* Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '14px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything about your business..."
              style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', fontFamily: 'inherit', color: '#f0f0f0', fontWeight: 300 }}
            />
            <button onClick={() => send()} disabled={loading} style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: '#7b9cff', fontSize: '18px', opacity: loading ? 0.4 : 1, transition: 'opacity 0.2s', flexShrink: 0 }}>→</button>
          </div>

          {/* Suggestion chips */}
          {!chatOpen && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{ padding: '5px 14px', border: '1px solid rgba(123,156,255,0.18)', borderRadius: '20px', background: 'transparent', color: '#9ba3c4', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,156,255,0.5)'; e.currentTarget.style.color = '#c8cde0' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(123,156,255,0.18)'; e.currentTarget.style.color = '#9ba3c4' }}
                >{s}</button>
              ))}
            </div>
          )}

          {!chatOpen && (
            <span onClick={() => exploreRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.08em', cursor: 'pointer' }}>
              or explore ↓
            </span>
          )}
        </div>
      </main>

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

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  )
}