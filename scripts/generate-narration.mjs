/**
 * SWRV Brand Transmission — Narration Generator
 * Uses ElevenLabs "Daniel" voice: deep British cinematic narrator
 *
 * Run once:
 *   ELEVENLABS_API_KEY=sk_... node scripts/generate-narration.mjs
 *
 * Outputs 9 MP3 files to: public/audio/narration-0.mp3 … narration-8.mp3
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.join(__dirname, '..', 'public', 'audio');

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('\n❌  Missing ELEVENLABS_API_KEY\n   Run: ELEVENLABS_API_KEY=sk_... node scripts/generate-narration.mjs\n');
  process.exit(1);
}

// Brian — Deep, Resonant and Comforting — American
const VOICE_ID = 'nPczCjzI2devNBz1zQrb';
const MODEL_ID = 'eleven_multilingual_v2';

// Exact narration text matching the scenes in brand-transmission.html
// Period-separated fragments produce natural pauses with TTS
const NARRATIONS = [
  // 0 — Roadblocks
  `Every journey. Has roadblocks. They come for everyone. No matter how prepared. No matter how talented. No matter how driven you are. No exceptions.`,

  // 1 — Agencies Stop
  `Most agencies. Get the job done. Complete the transaction. Close the ticket. Move on. But you. Are not a transaction. To us.`,

  // 2 — We Swerve
  `We don't stop. Twenty years. Navigating every obstacle. With creativity. With intention. With heart. We don't stop. We swerve. Swrv. On the Go.`,

  // 3 — 20+ Years
  `Twenty years. Of real world experience. Not software. Not shortcuts. Not automation. Genuine care. Lived experience. A deep passion for helping people fulfill the purpose. God placed inside them.`,

  // 4 — Services
  `Photography. Videography. Original music. Jingles. Commercials. Radio shows. Podcasts. Vision and mission statements. One full service branding ecosystem. Built entirely. Around you.`,

  // 5 — Everyone Is a Creator
  `The world has changed. Content creation is how the world speaks now. The entrepreneur. The pastor. The coach. The business owner. They are all artists. And every artist needs a brand. That is intentional. Authentic. Built to last.`,

  // 6 — You Need More
  `When you don't know which way to go. You need more than a service. You need a guide. Someone who swerves with you. Around every obstacle. Every roadblock. Every unexpected detour.`,

  // 7 — Love GPS
  `Swerve on roadblocks. Let love GPS. We navigate every challenge. With patience. With purpose. With a genuine investment in where you are trying to go. Because when love leads. Nothing. Can stop the mission.`,

  // 8 — Brand Close
  `Swrv On the Go. A full service branding ecosystem. Built entirely around you. We want the experience of building with you. The pleasure of serving you. We want to swerve in our gifts. Every step. Of the way.`,
];

// Ensure output directory exists
fs.mkdirSync(OUT_DIR, { recursive: true });

async function generate(idx, text) {
  const outFile = path.join(OUT_DIR, `narration-${idx}.mp3`);

  console.log(`\n[${idx + 1}/9] Generating: narration-${idx}.mp3`);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key':   API_KEY,
      'Content-Type': 'application/json',
      'Accept':       'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      speed: 0.72,             // slowed down — deliberate, cinematic pacing
      voice_settings: {
        stability:         0.22,  // dramatic, expressive — not robotic
        similarity_boost:  0.92,  // stay true to Brian's deep natural timbre
        style:             0.60,  // maximum cinematic gravitas
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs API error [${response.status}]: ${err}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outFile, buffer);
  console.log(`   ✓  Saved → public/audio/narration-${idx}.mp3  (${(buffer.length / 1024).toFixed(0)} KB)`);
}

(async () => {
  console.log('\n🎙  SWRV Brand Transmission — Narration Generator');
  console.log('   Voice: ElevenLabs "Brian" (deep resonant American narrator)');
  console.log('   Speed: 0.72 — slow, deliberate, cinematic\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let i = 0; i < NARRATIONS.length; i++) {
    await generate(i, NARRATIONS[i]);
    if (i < NARRATIONS.length - 1) await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n✅  All 9 files generated in public/audio/');
  console.log('   Open http://localhost:3002/brand-transmission.html\n');
})();
