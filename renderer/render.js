import { chromium } from "playwright";
import { PROJECT } from "../config/scenes.js";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "output");
const FRAMES = path.join(OUTPUT, "frames");

const WIDTH = PROJECT.width;
const HEIGHT = PROJECT.height;
const FPS = PROJECT.fps;
const DURATION = PROJECT.duration;

await mkdir(FRAMES, { recursive: true });
await mkdir(OUTPUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"]
});

const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1
});

await page.goto("file://" + path.join(ROOT, "index.html"));
await page.waitForTimeout(1000);

const totalFrames = Math.ceil(DURATION * FPS);

for (let i = 0; i < totalFrames; i++) {
  const time = i / FPS;

  await page.evaluate((t) => {
    window.LOVE_BOMBING.renderAt(t);
  }, time);

  await page.screenshot({
    path: path.join(
      FRAMES,
      `frame-${String(i).padStart(5, "0")}.png`
    ),
    type: "png"
  });

  if (i % 150 === 0) {
    console.log(`Rendering ${i}/${totalFrames}`);
  }
}

await browser.close();

const video = path.join(OUTPUT, "love-bombing-v1.mp4");
const audio = path.join(
  ROOT,
  "assets/audio/ElevenLabs_2026-11-10T13_06_05_Dhea - Warm, Expressive and Clear_eleven_multilingual_v2.mp3"
);

const ffmpeg = spawn("ffmpeg", [
  "-y",
  "-framerate", String(FPS),
  "-i", path.join(FRAMES, "frame-%05d.png"),
  "-i", audio,
  "-t", String(DURATION),
  "-c:v", "libx264",
  "-preset", "ultrafast",
  "-crf", "23",
  "-pix_fmt", "yuv420p",
  "-c:a", "aac",
  "-b:a", "192k",
  video
], { stdio: "inherit" });

ffmpeg.on("close", (code) => {
  if (code !== 0) {
    console.error("FFmpeg gagal:", code);
    process.exit(1);
  }

  console.log("VIDEO SELESAI:", video);
});
