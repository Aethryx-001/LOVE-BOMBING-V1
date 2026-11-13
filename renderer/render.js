
import { PROJECT, SCENES } from "../config/scenes.js";
import { SUBTITLES } from "../config/subtitles.js";
import { renderScene } from "./scenes.js";

const stage = document.getElementById("stage");
const sceneLayer = document.getElementById("scene-layer");
const subtitleElement = document.getElementById("subtitle");

function createScenes() {
  sceneLayer.innerHTML = "";

  for (const scene of SCENES) {
    const element = document.createElement("section");
    element.className = "scene";
    element.dataset.scene = scene.id;
    element.innerHTML = renderScene(scene.id);
    sceneLayer.appendChild(element);
  }
}

function renderSubtitle(time) {
  const current = SUBTITLES.find(
    item => time >= item.start && time < item.end
  );

  if (!current) {
    subtitleElement.textContent = "";
    return;
  }

  const words = current.text.split(" ");
  const highlighted = new Set(
    current.highlight.map(word => word.toLowerCase())
  );

  subtitleElement.innerHTML = words.map(word => {
    const clean = word.replace(/[.,!?]/g, "").toLowerCase();
    const escaped = word.replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

    return highlighted.has(clean)
      ? `<span class="highlight">${escaped}</span>`
      : escaped;
  }).join(" ");
}

function renderFrame(time) {
  const current = SCENES.find(
    scene => time >= scene.start && time < scene.end
  );

  for (const element of sceneLayer.children) {
    element.classList.toggle(
      "active",
      element.dataset.scene === current?.id
    );
  }

  stage.dataset.currentScene = current?.id || "ending";
  renderSubtitle(time);
}

function renderAt(time) {
  renderFrame(time);
}

createScenes();

window.LOVE_BOMBING = {
  project: PROJECT,
  scenes: SCENES,
  subtitles: SUBTITLES,
  renderAt
};
