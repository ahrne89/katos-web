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
        const replyContent = raw.replace('[BOOK_CTA]', '').trim()
        setMessages([...updatedMessages, { role: 'assistant', content: replyContent, showCTA }])
      }
      scrollChat()
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
      scrollChat()
    }
    setLoading(false)
  }

  const suggestions = ['Automate customer support', 'Build me a website', 'Connect my tools']

  const services = [
    { number: '01', title: 'Websites', desc: 'Fast, clean, built to convert. Integrated with the tools your business actually uses.', href: '/services' },
    { number: '02', title: 'AI agents', desc: 'Like Kato — but for your business. Handles enquiries 24/7 so you don\'t have to.', href: '/services' },
    { number: '03', title: 'AI consulting', desc: 'We help you figure out where AI adds value — and where it doesn\'t. No hype.', href: '/services' },
    { number: '04', title: 'Integrations', desc: 'Shopify, APIs, headless CMS. Connecting systems that should already talk to each other.', href: '/services' },
  ]

  return (
    <>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);} }
        @keyframes spin1 { from{transform:rotateX(72deg) rotateZ(0deg);}to{transform:rotateX(72deg) rotateZ(360deg);} }
        @keyframes spin2 { from{transform:rotateX(18deg) rotateZ(0deg);}to{transform:rotateX(18deg) rotateZ(-360deg);} }
        @keyframes spin3 { from{transform:rotateX(48deg) rotateY(25deg) rotateZ(0deg);}to{transform:rotateX(48deg) rotateY(25deg) rotateZ(360deg);} }
        @keyframes corePulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.08);} }
        @keyframes glowPulse { 0%,100%{opacity:0.5;transform:scale(1);}50%{opacity:1;transform:scale(1.15);} }
        @keyframes flarePulse { 0%,100%{opacity:0.5;}50%{opacity:0.9;} }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#080d1f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} style={{ position: 'absolute', width: Math.random() > 0.85 ? '2px' : '1px', height: Math.random() > 0.85 ? '2px' : '1px', borderRadius: '50%', background: '#fff', opacity: Math.random() * 0.5 + 0.1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <nav className="nav-padding" style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', zIndex: 10 }}>
          <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', color: '#f0f0f0' }}>KATOS</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Services', 'Projects', 'About'].map(l => (
              <a key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '13px', color: '#9ba3c4', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '560px', padding: '80px 20px 0', position: 'relative', zIndex: 1 }}>

          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(123,156,255,0.55)', textTransform: 'uppercase', margin: '0 0 14px' }}>Kato</p>

          <h1 className="hero-text" style={{ fontSize: '32px', fontWeight: 300, color: '#f0f0f0', margin: '0 0 10px', letterSpacing: '-0.3px', lineHeight: 1.25, textAlign: 'center' }}>
            We build AI systems that<br />automate your business
          </h1>

          <p style={{ fontSize: '14px', color: '#9ba3c4', fontWeight: 300, margin: '0', textAlign: 'center' }}>
            Talk to Kato to explore your use case
          </p>

          {/* Orb */}
          <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-8px 0 -8px' }}>

            <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(70,110,255,0.14) 0%, transparent 70%)', animation: 'glowPulse 3.5s ease-in-out infinite', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,140,255,0.18) 0%, transparent 65%)', animation: 'glowPulse 3.5s ease-in-out infinite 0.4s', pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', width: '210px', height: '210px', borderRadius: '50%', border: '1px solid rgba(123,156,255,0.2)', transformStyle: 'preserve-3d', animation: 'spin1 9s linear infinite' }}>
              <div style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#a0b4ff', boxShadow: '0 0 10px rgba(160,180,255,0.9)', top: '50%', left: '50%', marginTop: '-4px', marginLeft: '101px' }} />
              <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: '#7b9cff', boxShadow: '0 0 8px rgba(123,156,255,0.9)', top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-107px' }} />
            </div>
            <div style={{ position: 'absolute', width: '248px', height: '248px', borderRadius: '50%', border: '1px solid rgba(123,156,255,0.1)', transformStyle: 'preserve-3d', animation: 'spin2 14s linear infinite' }}>
              <div style={{ position: 'absolute', width: '7px', height: '7px', borderRadius: '50%', background: '#c8d8ff', boxShadow: '0 0 10px rgba(200,216,255,0.9)', top: '50%', left: '50%', marginTop: '-3.5px', marginLeft: '120px' }} />
            </div>
            <div style={{ position: 'absolute', width: '175px', height: '175px', borderRadius: '50%', border: '1px solid rgba(123,156,255,0.16)', transformStyle: 'preserve-3d', animation: 'spin3 6.5s linear infinite' }}>
              <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: '#5b8fff', boxShadow: '0 0 8px rgba(91,143,255,0.9)', top: '50%', left: '50%', marginTop: '-3px', marginLeft: '-91px' }} />
            </div>

            {/* Core */}
            <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', animation: 'corePulse 3.5s ease-in-out infinite', zIndex: 10, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 38% 38%, #e8f0ff 0%, #a0b8ff 20%, #6080f0 45%, #2840c0 70%, #0d1860 100%)' }} />
              <div style={{ position: 'absolute', width: '36px', height: '36px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(220,235,255,0.5) 50%, transparent 80%)', top: '8px', left: '10px' }} />
              <div style={{ position: 'absolute', width: '18px', height: '18px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, transparent 80%)', top: '12px', left: '14px' }} />
              <div style={{ position: 'absolute', width: '52px', height: '3px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 100%)', top: '26px', left: '8px', transform: 'rotate(-32deg)', transformOrigin: 'center', animation: 'flarePulse 3.5s ease-in-out infinite', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', width: '72px', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 65%, transparent 100%)', top: '28px', left: '3px', transform: 'rotate(-32deg)', transformOrigin: 'center', animation: 'flarePulse 3.5s ease-in-out infinite 0.1s', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', width: '4px', height: '4px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)', top: '9px', left: '18px' }} />
            </div>

            <span style={{ position: 'absolute', top: '28px', left: '20px', fontSize: '12px', color: 'rgba(160,185,255,0.65)', letterSpacing: '0.04em' }}>Automate</span>
            <span style={{ position: 'absolute', top: '28px', right: '20px', fontSize: '12px', color: 'rgba(160,185,255,0.65)', letterSpacing: '0.04em' }}>Analyze</span>
            <span style={{ position: 'absolute', bottom: '32px', right: '15px', fontSize: '12px', color: 'rgba(160,185,255,0.65)', letterSpacing: '0.04em' }}>Integrate</span>
            <span style={{ position: 'absolute', bottom: '32px', left: '20px', fontSize: '12px', color: 'rgba(160,185,255,0.65)', letterSpacing: '0.04em' }}>Scale</span>
          </div>

          {/* Chat */}
          {chatOpen && (
            <div ref={chatContainerRef} style={{ width: '100%', height: '36vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px 0 8px', marginBottom: '8px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                  <div style={{ maxWidth: '85%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: '14px', lineHeight: '1.6', fontWeight: 300, background: m.role === 'user' ? '#1e2a52' : 'rgba(255,255,255,0.06)', color: m.role === 'user' ? '#e0e8ff' : '#d8ddf0', border: m.role === 'user' ? '1px solid rgba(123,156,255,0.2)' : '1px solid rgba(255,255,255,0.07)' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '14px' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask me anything about your business..." style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', fontFamily: 'inherit', color: '#f0f0f0', fontWeight: 300 }} />
            <button onClick={() => send()} disabled={loading} style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: '#7b9cff', fontSize: '18px', opacity: loading ? 0.4 : 1, transition: 'opacity 0.2s', flexShrink: 0 }}>→</button>
          </div>

          {!chatOpen && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{ padding: '5px 14px', border: '1px solid rgba(123,156,255,0.18)', borderRadius: '20px', background: 'transparent', color: '#9ba3c4', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
              ))}
            </div>
          )}

          {!chatOpen && (
            <span onClick={() => exploreRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '11px', color: '#7b85a8', letterSpacing: '0.08em', cursor: 'pointer', marginBottom: '40px' }}>
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
    </>
  )
}