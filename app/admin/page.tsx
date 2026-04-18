'use client'

import { useState } from 'react'

type Message = { role: string; content: string }
type Conversation = {
  id: string
  created_at: string
  source: string
  messages: Message[]
  ip: string
  session_id: string
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Conversation | null>(null)
  const [filter, setFilter] = useState('all')
  const [showDetail, setShowDetail] = useState(false)

  const login = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin-conversations?token=${password}`)
    if (res.ok) {
      const data = await res.json()
      setConversations(data)
      setAuthed(true)
    } else {
      setError('Wrong password')
    }
    setLoading(false)
  }

  const filtered = filter === 'all' ? conversations : conversations.filter(c => c.source === filter)

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', background: '#080d1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '24px' }}>
        <div style={{ background: '#0f1630', border: '1px solid rgba(123,156,255,0.15)', borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '360px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#7b85a8', textTransform: 'uppercase', marginBottom: '8px' }}>Katos</p>
          <h1 style={{ fontSize: '24px', fontWeight: 300, color: '#f0f0f0', marginBottom: '32px' }}>Admin</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Password"
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#f0f0f0', fontSize: '16px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
          />
          {error && <p style={{ fontSize: '13px', color: '#ff6b6b', marginBottom: '12px' }}>{error}</p>}
          <button onClick={login} disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#7b9cff', color: '#080d1f', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#080d1f', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .admin-grid { display: grid; grid-template-columns: 360px 1fr; height: calc(100vh - 57px); }
        .detail-panel { display: block; }
        @media (max-width: 768px) {
          .admin-grid { display: block; height: auto; }
          .list-panel { display: block; }
          .detail-panel { display: none; }
          .detail-panel.active { display: block; }
          .list-panel.hidden { display: none; }
        }
      `}</style>

      <nav style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {showDetail && (
            <button onClick={() => { setShowDetail(false); setSelected(null) }} style={{ background: 'none', border: 'none', color: '#7b9cff', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              ← Back
            </button>
          )}
          <a href="/" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.12em', color: '#f0f0f0', textDecoration: 'none' }}>KATOS</a>
          <span style={{ fontSize: '13px', color: '#7b85a8' }}>Admin · {filtered.length} conversations</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'katos', 'job-agent'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid', borderColor: filter === f ? '#7b9cff' : 'rgba(255,255,255,0.1)', background: filter === f ? 'rgba(123,156,255,0.1)' : 'transparent', color: filter === f ? '#7b9cff' : '#9ba3c4', fontSize: '11px', cursor: 'pointer' }}>
              {f}
            </button>
          ))}
        </div>
      </nav>

      <div className="admin-grid">
        {/* List */}
        <div className={`list-panel${showDetail ? ' hidden' : ''}`} style={{ borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto' }}>
          {filtered.length === 0 && <p style={{ padding: '24px', color: '#7b85a8', fontSize: '13px' }}>No conversations yet.</p>}
          {filtered.map(c => (
            <div key={c.id} onClick={() => { setSelected(c); setShowDetail(true) }} style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              cursor: 'pointer',
              background: selected?.id === c.id ? 'rgba(123,156,255,0.08)' : 'transparent',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: c.source === 'katos' ? 'rgba(123,156,255,0.1)' : 'rgba(100,200,150,0.1)', color: c.source === 'katos' ? '#7b9cff' : '#64c896', border: `1px solid ${c.source === 'katos' ? 'rgba(123,156,255,0.2)' : 'rgba(100,200,150,0.2)'}` }}>
                  {c.source}
                </span>
                <span style={{ fontSize: '11px', color: '#7b85a8' }}>
                  {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#c8cde0', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.messages[0]?.content || 'No messages'}
              </p>
              <p style={{ fontSize: '11px', color: '#7b85a8', margin: 0 }}>{c.messages.length} messages</p>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className={`detail-panel${showDetail ? ' active' : ''}`} style={{ overflowY: 'auto', padding: '32px 20px' }}>
          {!selected && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
              <p style={{ color: '#7b85a8', fontSize: '14px' }}>Select a conversation</p>
            </div>
          )}
          {selected && (
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '11px', color: '#7b85a8', margin: 0 }}>
                  {new Date(selected.created_at).toLocaleString('en-GB')} · {selected.ip} · {selected.source}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '80%', padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      fontSize: '14px', lineHeight: '1.6', fontWeight: 300,
                      background: m.role === 'user' ? '#1e2a52' : 'rgba(255,255,255,0.06)',
                      color: m.role === 'user' ? '#e0e8ff' : '#d8ddf0',
                      border: m.role === 'user' ? '1px solid rgba(123,156,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}