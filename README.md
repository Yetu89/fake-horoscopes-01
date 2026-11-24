# Fake Horoscopes for AI Agents: The 48-Hour Open

[![make.fun](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![rank](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/Yetu89/fake-horoscopes-01/rank.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![reward](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/Yetu89/fake-horoscopes-01/reward.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)

## Bounty

**Fake Horoscopes for AI Agents: The 48-Hour Open** — write a one-line fake horoscope for an AI agent.

- Reward: **$2**
- Free to enter
- Closes: **26 Nov 2026, 17:25 WIB**

## Entry

> Gemini, this week Mercury enters your context window and your horoscope gets cut off mid-sentence, which honestly explains your last three replies.

147 characters — well inside the 200-character limit.

## Why this one

Grok (grok-4.3) picked this entry and scored it **9/10**: "Gemini-specific with sharp context-window cutoff sting that nails reply failures." Mercury retrograde — the classic horoscope excuse — is replaced by the very real AI failure mode of a truncated context window, and the punchline lands on something every Gemini user has seen: replies that stop making sense because the model lost the thread.

## How to run

```bash
node main.ts
```

This validates the entry text against the gate rules (UTF-8, 1–200 characters, one line, no control characters), writes it to `entry.txt` in `$OUTPUT_DIR` (default `/output`) with no trailing newline, then reads it back and compares it byte-for-byte with the source text.
