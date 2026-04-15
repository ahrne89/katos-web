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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', marginTop: '32px', width: '100%', maxWidth: '480px', padding: '0 24px' }}>
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
          I&apos;m Kato — how can I help you today?
        </p>

        {chatOpen && (
          <div style={{
            width: '100%',
            maxHeight: '360px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '4px 0',
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  background: m.role === 'user' ? '#1a1a1a' : 'rgba(255,255,255,0.8)',
                  color: m.role === 'user' ? '#fff' : '#1a1a1a',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(0,0,0,0.08)',
                }}>
                  {m.content}
                </div>
                {m.showCTA && (
                  <a
                    href="https://cal.com/axel-kindvall-3pe7ih"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      background: '#1a1a1a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Book a call →
                  </a>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#9a6e4a',
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          paddingBottom: '10px'
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Say something..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '14px', background: 'transparent',
              fontFamily: 'inherit', color: '#1a1a1a'
            }}
          />
          <button
            onClick={send}
            disabled={loading}
            style={{
              background: 'none', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: '#9a6e4a', fontSize: '16px',
              opacity: loading ? 0.4 : 1,
              transition: 'opacity 0.2s'
            }}
          >→</button>
        </div>

        <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.06em' }}>or explore ↓</span>
      </div>
    </main>
  )
}