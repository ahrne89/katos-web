import Anthropic from '@anthropic-ai/sdk'
import { katosPrompt } from '../../../lib/katos-knowledge'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const client = new Anthropic()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

const rateLimitMap = new Map()

function isRateLimited(ip: string) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 10
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, [])
  const timestamps = rateLimitMap.get(ip).filter((t: number) => now - t < windowMs)
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  return timestamps.length > maxRequests
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please wait a moment.' }, { status: 429 })
  }

  const { messages } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: katosPrompt,
      messages,
    })

    const block = response.content[0]
    const reply = block.type === 'text' ? block.text : ''

    await supabase.from('conversations').insert({
      source: 'katos',
      messages: [...messages, { role: 'assistant', content: reply }],
      ip,
    })

    return NextResponse.json({ reply })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}