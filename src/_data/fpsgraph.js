const nodes = [
  { name: "Identity Defense Grid", colour: "#ff0055", pulsar: true },
  { name: "Adversarial Entropy", colour: "#ffaa00", pulsar: false },
  { name: "Spectra", colour: "#00ff88", pulsar: true },
  { name: "FPSZERO Lab", colour: "#ff8800", pulsar: true },
  { name: "FPSZERO Origin", colour: "#ffffff", pulsar: false },
];

const R = 30;
const LINK = 40;
const n = nodes.length;

const placed = nodes.map((node, i) => {
  const phi = Math.acos(-1 + (2 * i) / n);
  const theta = Math.sqrt(n * Math.PI) * phi;
  return {
    ...node,
    x3: R * Math.cos(theta) * Math.sin(phi),
    y3: R * Math.sin(theta) * Math.sin(phi),
    z3: R * Math.cos(phi),
  };
});

const edges = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const a = placed[i];
    const b = placed[j];
    const d = Math.hypot(a.x3 - b.x3, a.y3 - b.y3, a.z3 - b.z3);
    if (d < LINK) edges.push({ from: i, to: j, distance: +d.toFixed(1) });
  }
}

const W = 360, H = 250, PAD = 46;
const xs = placed.map((p) => p.x3), ys = placed.map((p) => p.y3);
const sx = (W - 2 * PAD) / (Math.max(...xs) - Math.min(...xs));
const sy = (H - 2 * PAD) / (Math.max(...ys) - Math.min(...ys));
const s = Math.min(sx, sy);
const ox = (W - s * (Math.max(...xs) + Math.min(...xs))) / 2;
const oy = (H - s * (Math.max(...ys) + Math.min(...ys))) / 2;

const points = placed.map((p) => ({
  name: p.name,
  colour: p.colour,
  pulsar: p.pulsar,
  x: +(ox + s * p.x3).toFixed(1),
  y: +(oy + s * p.y3).toFixed(1),
  r: +(4 + (p.z3 + R) / (2 * R) * 3).toFixed(1),
}));

module.exports = {
  width: W,
  height: H,
  points,
  lines: edges.map((e) => ({
    x1: points[e.from].x, y1: points[e.from].y,
    x2: points[e.to].x, y2: points[e.to].y,
    label: `${points[e.from].name} to ${points[e.to].name}`,
  })),
  edgeCount: edges.length,
};
