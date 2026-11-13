
export const PROJECT = {
  title: "LOVE BOMBING",
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 65,
  audioDuration: 62.876688,

  colors: {
    obsidian: "#101010",
    charcoal: "#292929",
    gold: "#B89B62",
    cream: "#F0E9DA",
    stone: "#77736B",
    lightStone: "#A8A196"
  }
};

export const SCENES = [
  {
    id: "attention",
    title: "THE ATTENTION",
    start: 0,
    end: 7,
    transition: "fade"
  },
  {
    id: "dependency",
    title: "DEPENDENCY",
    start: 7,
    end: 13.7,
    transition: "soft-blur"
  },
  {
    id: "title",
    title: "LOVE BOMBING",
    start: 13.7,
    end: 17.66,
    transition: "scale-in"
  },
  {
    id: "pattern",
    title: "THE PATTERN",
    start: 17.66,
    end: 26.81,
    transition: "staggered"
  },
  {
    id: "beginning",
    title: "THE BEGINNING",
    start: 26.81,
    end: 30.44,
    transition: "cross-dissolve"
  },
  {
    id: "turning-point",
    title: "THE TURNING POINT",
    start: 30.44,
    end: 42.71,
    transition: "mask-wipe"
  },
  {
    id: "shift",
    title: "THE SHIFT",
    start: 42.71,
    end: 53.22,
    transition: "slow-dissolve"
  },
  {
    id: "truth",
    title: "THE TRUTH",
    start: 53.22,
    end: 65,
    transition: "fade-out"
  }
];
