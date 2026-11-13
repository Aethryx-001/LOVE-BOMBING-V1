
import { chromium } from "playwright";
import { PROJECT } from "../config/scenes.js";
import { mkdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "output");
const FRAMES = path.join(OUTPUT, "frames");

const WIDTH = PROJECT.width;
const HEIGHT = PROJECT.height;
const FPS = PROJECT.fps;
const DURATION = PROJECT.duration;

const PORT = 4173;

await mkdir(FRAMES, { recursive: true });
await mkdir(OUTPUT, { recursive: true });

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const pathname = decodeURIComponent(url.pathname);
    const relativePath =
      pathname === "/" ? "index.html" : pathname.slice(1);

    const filePath = path.resolve(ROOT, relativePath);

    if (
      filePath !== ROOT &&
      !filePath.startsWith(ROOT + path.sep)
    ) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const file = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type":
        MIME_TYPES[ext] || "application/octet-stream"
    });

    res.end(file);
  } catch {
    res.writeHead(404);
    res.end("File not found");
  }
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(PORT, "127.0.0.1", resolve);
});

console.log("Local server ready.");

let browser;

try {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage({
    viewport: {
      width: WIDTH,
      height: HEIGHT
    },
    deviceScaleFactor: 1
  });

  page.on("pageerror", error => {
    console.error("Browser error:", error);
  });

  await page.goto(`http://127.0.0.1:${PORT}`, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForFunction(() => {
    return typeof window.LOVE_BOMBING?.renderAt === "function";
  }, { timeout: 60000 });

  const totalFrames = Math.ceil(DURATION * FPS);

  console.log(`Starting render: ${totalFrames} frames`);

  for (let i = 0; i < totalFrames; i++) {
    const time = i / FPS;

    await page.evaluate(t => {
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
  browser = null;

  const video = path.join(OUTPUT, "love-bombing-v1.mp4");

  const audio = path.join(
    ROOT,
    "assets/audio/ElevenLabs_2026-11-10T13_06_05_Dhea - Warm, Expressive and Clear_eleven_multilingual_v2.mp3"
  );

  await readFile(audio);

  console.log("Encoding video with FFmpeg...");

  await new Promise((resolve, reject) => {
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
    ], {
      stdio: "inherit"
    });

    ffmpeg.on("error", reject);

    ffmpeg.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  console.log("VIDEO SELESAI:", video);

} finally {
  if (browser) {
    await browser.close();
  }

  await new Promise(resolve => {
    server.close(resolve);
  });
}
