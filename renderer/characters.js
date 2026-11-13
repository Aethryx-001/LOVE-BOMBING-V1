
const COLORS = {
  male: "#171717",
  female: "#171717",
  edge: "#B89B62"
};

function maleSilhouette() {
  return `
    <svg viewBox="0 0 300 700"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Male faceless silhouette">

      <g fill="${COLORS.male}">
        <circle cx="150" cy="75" r="48"/>
        <path d="
          M105 135
          Q150 115 195 135
          L215 290
          L200 330
          L190 440
          L175 440
          L170 310
          L130 310
          L125 440
          L110 440
          L100 330
          L85 290 Z"/>

        <path d="
          M105 145
          L65 170
          L20 315
          L38 325
          L95 225
          L120 175 Z"/>

        <path d="
          M195 145
          L235 170
          L280 315
          L262 325
          L205 225
          L180 175 Z"/>

        <path d="
          M110 430 L145 430
          L140 620 L100 620 Z"/>

        <path d="
          M155 430 L190 430
          L200 620 L160 620 Z"/>

        <path d="
          M100 610 L140 610
          L145 670 L80 670 Z"/>

        <path d="
          M160 610 L200 610
          L220 670 L155 670 Z"/>
      </g>

      <path d="M105 135 Q150 115 195 135"
        fill="none" stroke="${COLORS.edge}"
        stroke-opacity=".28" stroke-width="2"/>
    </svg>
  `;
}

function femaleSilhouette() {
  return `
    <svg viewBox="0 0 300 700"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Female faceless silhouette">

      <g fill="${COLORS.female}">
        <circle cx="150" cy="75" r="48"/>

        <path d="
          M105 135
          Q150 115 195 135
          L215 285
          L195 330
          L105 330
          L85 285 Z"/>

        <path d="
          M105 145
          L65 170
          L20 315
          L38 325
          L95 225
          L120 175 Z"/>

        <path d="
          M195 145
          L235 170
          L280 315
          L262 325
          L205 225
          L180 175 Z"/>

        <path d="
          M105 315
          Q150 330 195 315
          L220 455
          Q150 475 80 455 Z"/>

        <path d="
          M110 450 L145 450
          L140 620 L100 620 Z"/>

        <path d="
          M155 450 L190 450
          L200 620 L160 620 Z"/>

        <path d="
          M100 610 L140 610
          L145 670 L80 670 Z"/>

        <path d="
          M160 610 L200 610
          L220 670 L155 670 Z"/>
      </g>

      <path d="M105 135 Q150 115 195 135"
        fill="none" stroke="${COLORS.edge}"
        stroke-opacity=".28" stroke-width="2"/>
    </svg>
  `;
}

export const CHARACTERS = {
  male: maleSilhouette,
  female: femaleSilhouette
};
