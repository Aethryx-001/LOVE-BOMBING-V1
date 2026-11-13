
import { CHARACTERS } from "./characters.js";

const male = CHARACTERS.male;
const female = CHARACTERS.female;

function character(type, x, y, scale = 1) {
  return `
    <div class="character"
      style="
        position:absolute;
        left:${x}%;
        bottom:${y}%;
        width:30%;
        transform:scale(${scale});
        transform-origin:bottom center;
      ">
      ${type()}
    </div>
  `;
}

function background(extra = "") {
  return `
    <div style="
      position:absolute;
      inset:0;
      background:
        radial-gradient(ellipse at 50% 45%,
          #292929 0%, #171717 42%, #101010 100%);
      ${extra}
    "></div>
  `;
}

function title(text, size = 76) {
  return `
    <div style="
      position:absolute;
      top:32%;
      left:8%;
      right:8%;
      color:#F0E9DA;
      font-family:Arial,sans-serif;
      font-weight:800;
      font-size:${size}px;
      letter-spacing:-2px;
      text-align:center;
      text-transform:uppercase;
    ">${text}</div>
  `;
}

export function renderScene(sceneId) {
  switch (sceneId) {
    case "attention":
      return `
        ${background()}
        ${character(male, 15, 10, 1)}
        ${character(female, 55, 10, 1)}
      `;

    case "dependency":
      return `
        ${background()}
        <div style="
          position:absolute;
          top:22%;
          left:15%;
          width:70%;
          height:2px;
          background:#B89B62;
          opacity:.35;
        "></div>
        ${character(female, 35, 8, 1.1)}
        ${title("EMOTIONAL DEPENDENCY", 54)}
      `;

    case "title":
      return `
        ${background()}
        ${title("LOVE", 100)}
        <div style="
          position:absolute;
          top:39%;
          width:100%;
          text-align:center;
          font-size:100px;
          font-weight:800;
          color:#B89B62;
        ">BOMBING</div>
      `;

    case "pattern":
      return `
        ${background()}
        ${character(male, 35, 5, .8)}
        <div style="
          position:absolute;
          top:25%;
          left:12%;
          right:12%;
          display:grid;
          gap:35px;
          color:#F0E9DA;
          font-size:48px;
          text-align:center;
        ">
          <div>01 / ATTENTION</div>
          <div>02 / COMPLIMENTS</div>
          <div>03 / COMMUNICATION</div>
          <div>04 / FUTURE PROMISES</div>
        </div>
      `;

    case "beginning":
      return `
        ${background()}
        ${character(male, 18, 8, .95)}
        ${character(female, 52, 8, .95)}
        ${title("THE BEGINNING", 64)}
      `;

    case "turning-point":
      return `
        ${background()}
        <div style="
          position:absolute;
          top:0;
          left:50%;
          width:3px;
          height:100%;
          background:#B89B62;
          opacity:.5;
        "></div>
        ${character(male, 12, 8, .9)}
        ${character(female, 57, 8, .9)}
        ${title("CONTROL", 90)}
      `;

    case "shift":
      return `
        ${background()}
        ${character(female, 35, 8, 1)}
        ${character(male, 67, 8, .65)}
        ${title("THE SHIFT", 84)}
      `;

    case "truth":
      return `
        ${background()}
        ${title("IT BEGINS", 78)}
        <div style="
          position:absolute;
          top:43%;
          left:10%;
          right:10%;
          color:#B89B62;
          text-align:center;
          font-size:76px;
          font-weight:800;
        ">WITH ATTENTION.</div>
      `;

    default:
      return background();
  }
}
