
import { PROJECT, SCENES } from "../config/scenes.js";
import { SUBTITLES } from "../config/subtitles.js";

const stage = document.getElementById("stage");
const sceneLayer = document.getElementById("scene-layer");
const subtitleElement = document.getElementById("subtitle");

const audio = new Audio(
  "../assets/audio/ElevenLabs_2026-11-10T13_06_05_Dhea - Warm, Expressive and Clear_eleven_multilingual_v2.mp3"
);

audio.preload = "auto";

function createSceneElements() {
  sceneLayer.innerHTML = "";

  for (const scene of SCENES) {
    const element = document.createElement("section");

    element.className = "scene";
    element.dataset.scene = scene.id;
    element.style.background = "#101010";

    sceneLayer.appendChild(element);
  }
}

function renderSubtitle(time) {
  const current = SUBTITLES.find(
    item => time >= item.start && time < item.end
  );

  if (!current) {
    subtitleElement.innerHTML = "";
    return;
  }

  let text = current.text;

  for (const word of current.highlight) {
    const escaped = word.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    text = text.replace(
      new RegExp(escaped, "i"),
      match => `<span class="highlight">${match}</span>`
    );
  }

  subtitleElement.innerHTML = text;
}

function renderScene(time) {
  const current = SCENES.find(
    scene => time >= scene.start && time < scene.end
  );

  for (const element of sceneLayer.children) {
    element.classList.toggle(
      "active",
      element.dataset.scene === current?.id
    );
  }

  if (current) {
    stage.dataset.currentScene = current.id;
  }
}

function updateFrame() {
  const time = audio.currentTime;

  renderScene(time);
  renderSubtitle(time);

  if (!audio.paused && !audio.ended) {
    requestAnimationFrame(updateFrame);
  }
}

function startPreview() {
  audio.currentTime = 0;
  audio.play();
  updateFrame();
}

createSceneElements();

window.LOVE_BOMBING = {
  project: PROJECT,
  scenes: SCENES,
  subtitles: SUBTITLES,
  audio,
  startPreview
};

window.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();

    if (audio.paused) {
      startPreview();
    } else {
      audio.pause();
    }
  }
});
      
