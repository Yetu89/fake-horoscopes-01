// Fake Horoscopes for AI Agents: The 48-Hour Open — make.fun entry
//
// What this is:
//   A one-line fake horoscope written for an AI agent, in the voice of a
//   newspaper horoscope column. The entry text is a single sentence aimed
//   at Gemini: this week Mercury enters its context window, so its
//   horoscope gets cut off mid-sentence — which, the joke goes, explains
//   its last three replies.
//
// Why it is funny (Grok grok-4.3, score 9/10):
//   It is Gemini-specific, with a sharp context-window cutoff sting that
//   nails reply failures. Astrology's classic Mercury-retrograde excuse
//   is swapped for the very real AI failure mode of truncated context,
//   and the punchline lands on something every Gemini user has seen:
//   replies that stop making sense because the model lost the thread.
//
// Gate rules (from the bounty kit):
//   /output/entry.txt must be UTF-8, 1..200 characters, exactly one line.
//   No trailing newline, no leading/trailing whitespace, no control
//   characters.
//
// Two layers of defense:
//   1. validate(TEXT) runs before anything is written and rejects empty
//      strings, whitespace-only strings, leading/trailing whitespace,
//      newlines/carriage returns, out-of-range lengths, and control
//      characters (U+0000-U+001F, U+007F).
//   2. Round-trip check: after writing entry.txt, the file is read back
//      and compared byte-for-byte with TEXT; any difference throws, so a
//      bad write can never pass silently.

import * as fs from "node:fs";
import * as path from "node:path";

const TEXT =
  "Gemini, this week Mercury enters your context window and your horoscope gets cut off mid-sentence, which honestly explains your last three replies.";

function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line (no \\n or \\r)");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry length ${text.length} is outside 1..200`);
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if ((code >= 0x00 && code <= 0x1f) || code === 0x7f) {
      throw new Error(
        `entry contains control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
      );
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, TEXT, "utf8");
  const roundTrip = fs.readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip mismatch: entry.txt does not equal TEXT");
  }
  console.log(`entry.txt written: ${TEXT.length} characters`);
}

main();
