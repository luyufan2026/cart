const S = 34;
const OX = 748;
const OY = 368;
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

const COLORS = {
  School: "#f3e6a4",
  "Daily Life": "#f4e0cc",
  Smoking: "#f6cfc9",
  Relationships: "#f5d4e2",
  Emotion: "#f7d3b0",
  Entertainment: "#d5e8cc",
  Existential: "#d4e3f3",
  Money: "#efe3b8",
  Travel: "#d3ebe3",
  Attitude: "#e5def1",
  frame: "#fbf9f6",
  garden: "#e5f0d6",
  site: "#f4f1eb",
  path: "#efe4d4"
};

const ZONE = {
  1: "School", 5: "School", 19: "School",
  4: "Smoking", 8: "Smoking", 17: "Smoking",
  13: "Relationships", 14: "Relationships",
  18: "Travel", 10: "Travel",
  9: "Daily Life", 12: "Daily Life", 16: "Daily Life",
  6: "Entertainment", 7: "Entertainment",
  3: "Emotion", 2: "Emotion", 20: "Emotion",
  11: "Existential",
  21: "Attitude",
  15: "Money"
};

const ANCHOR_AT = {
  1: [1.4, 1.4, 5.15], 5: [2.2, 2.2, 5.15], 19: [1.2, 2.6, 5.15],
  6: [8.2, 1.3, 5.1], 7: [8.8, 2.0, 5.1],
  4: [8.6, 4.4, 6.15], 8: [9.2, 5.0, 6.15], 17: [8.4, 5.2, 6.15],
  13: [1.5, 1.2, 6.55], 14: [2.4, 1.8, 6.55],
  18: [8.2, 4.0, 3.5], 10: [8.8, 4.8, 3.5],
  9: [1.4, 4.2, 3.5], 12: [5.2, 7.4, 2.15], 16: [5.0, 1.2, 3.7],
  3: [4.8, 1.2, 6.5], 2: [5.4, 1.8, 6.5], 20: [4.4, 1.6, 6.5],
  11: [1.8, 1.2, 8.05],
  21: [5.2, 1.0, 7.75],
  15: [8.3, 6.0, 3.4]
};

const NOTES = {
  13: [28, 158], 14: [28, 252],
  11: [500, 34], 21: [720, 26], 3: [960, 34],
  1: [28, 356], 5: [28, 456],   19: [28, 548],
  9: [28, 648],
  12: [250, 728], 16: [460, 736],
  2: [1296, 156], 20: [1296, 246],
  6: [1296, 340], 7: [1296, 430],
  4: [1296, 524], 8: [1296, 614], 17: [1296, 704],
  18: [1128, 636], 10: [980, 668], 15: [1088, 736]
};

const SCRAPS = [
  { src: "images/talk.svg", x: 230, y: 168, w: 72, r: -6, to: 13 },
  { src: "images/phone.svg", x: 224, y: 262, w: 54, r: 5, to: 14 },
  { src: "images/window.svg", x: 590, y: 86, w: 68, r: -4, to: 11 },
  { src: "images/room.svg", x: 860, y: 88, w: 70, r: 3, to: 3 },
  { src: "images/study.svg", x: 236, y: 366, w: 78, r: -5, to: 1 },
  { src: "images/laptop.svg", x: 230, y: 468, w: 68, r: 4, to: 19 },
  { src: "images/notebook.svg", x: 228, y: 558, w: 60, r: -3, to: 5 },
  { src: "images/subway.svg", x: 236, y: 656, w: 74, r: 4, to: 9 },
  { src: "images/walk.svg", x: 400, y: 716, w: 68, r: -5, to: 12 },
  { src: "images/controller.svg", x: 1172, y: 348, w: 64, r: 6, to: 6 },
  { src: "images/vinyl.svg", x: 1168, y: 438, w: 62, r: -4, to: 7 },
  { src: "images/cigarette.svg", x: 1164, y: 534, w: 68, r: 3, to: 4 },
  { src: "images/lighter.svg", x: 1160, y: 714, w: 58, r: -3, to: 17 },
  { src: "images/passport.svg", x: 1048, y: 620, w: 60, r: 5, to: 18 },
  { src: "images/airplane.svg", x: 900, y: 652, w: 72, r: -6, to: 10 },
  { src: "images/receipt.svg", x: 1000, y: 748, w: 54, r: 4, to: 15 }
];

const svg = document.getElementById("sheet");
const layer = document.getElementById("layer");
const tip = document.getElementById("tip");
const NS = "http://www.w3.org/2000/svg";

let frequencyChart = null;
let categoryChart = null;
let locked = null;
let hover = null;
const anchors = {};
const queue = [];

function iso(x, y, z) {
  return [
    OX + (x - y) * COS * S,
    OY + (x + y) * SIN * S - z * S
  ];
}

function node(name, attrs) {
  const el = document.createElementNS(NS, name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function tint(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, v + amt)).toString(16).padStart(2, "0");
  return "#" + ch((n >> 16) & 255) + ch((n >> 8) & 255) + ch(n & 255);
}

function face(pts, fill, stroke, cat, depth) {
  const poly = node("polygon", {
    points: pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "),
    fill,
    stroke,
    "stroke-width": "0.8",
    "stroke-linejoin": "round"
  });
  if (cat) {
    poly.dataset.cat = cat;
    poly.classList.add("zone");
  }
  queue.push({ depth, node: poly });
}

function edge(a, b, stroke, width, depth, dash) {
  const line = node("line", {
    x1: a[0].toFixed(1),
    y1: a[1].toFixed(1),
    x2: b[0].toFixed(1),
    y2: b[1].toFixed(1),
    stroke,
    "stroke-width": String(width)
  });
  if (dash) line.setAttribute("stroke-dasharray", dash);
  queue.push({ depth, node: line });
}

function box(x, y, z, w, d, h, key) {
  const fill = COLORS[key] || COLORS.frame;
  const stroke = key ? tint(fill, -28) : "#e3d4cc";
  const top = fill;
  const south = tint(fill, key ? -16 : -6);
  const east = tint(fill, key ? -26 : -12);
  const depth = x + y + z * 0.03;
  face([
    iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)
  ], top, stroke, key, depth + 0.02);
  face([
    iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)
  ], east, stroke, key, depth + 0.01);
  face([
    iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)
  ], south, stroke, key, depth);
}

function slab(x, y, z, w, d, key) {
  box(x, y, z, w, d, 0.1, key || null);
  const step = 1;
  for (let i = step; i < w; i += step) {
    edge(iso(x + i, y, z + 0.1), iso(x + i, y + d, z + 0.1), "rgba(190,160,150,0.35)", 0.45, x + y + 0.2);
  }
  for (let j = step; j < d; j += step) {
    edge(iso(x, y + j, z + 0.1), iso(x + w, y + j, z + 0.1), "rgba(190,160,150,0.35)", 0.45, x + y + 0.2);
  }
}

function column(x, y, z0, z1) {
  box(x, y, z0, 0.11, 0.11, z1 - z0, null);
}

function rail(x, y, z, length, axis) {
  const posts = Math.max(2, Math.round(length / 0.7));
  for (let i = 0; i <= posts; i += 1) {
    const t = (length * i) / posts;
    const px = axis === "x" ? x + t : x;
    const py = axis === "y" ? y + t : y;
    edge(iso(px, py, z), iso(px, py, z + 0.38), "#d9c8c0", 0.7, px + py + 0.4);
  }
  const x2 = axis === "x" ? x + length : x;
  const y2 = axis === "y" ? y + length : y;
  edge(iso(x, y, z + 0.38), iso(x2, y2, z + 0.38), "#d9c8c0", 0.7, x + y + 0.5);
}

function tree(x, y, z, r) {
  const p = iso(x, y, z);
  const g = node("g", {});
  g.appendChild(node("line", {
    x1: p[0], y1: p[1], x2: p[0], y2: p[1] - r * 0.9,
    stroke: "#c2ae98", "stroke-width": "0.8"
  }));
  g.appendChild(node("ellipse", {
    cx: p[0], cy: p[1] - r * 1.15, rx: r * 1.35, ry: r * 0.78,
    fill: "#d7ebc4", stroke: "#b7cba4", "stroke-width": "0.6"
  }));
  queue.push({ depth: x + y + z * 0.03 + 0.2, node: g });
}

function person(x, y, z) {
  const p = iso(x, y, z);
  const g = node("g", { transform: `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})` });
  g.appendChild(node("circle", {
    cx: "0", cy: "-15", r: "2.1", fill: "none", stroke: "#3a342e", "stroke-width": "0.8"
  }));
  g.appendChild(node("path", {
    d: "M0 -13 V-6 M0 -10 L-4.2 -6.2 M0 -10 L4.2 -6 M0 -6 L-3 1.5 M0 -6 L3.2 1.5",
    fill: "none", stroke: "#3a342e", "stroke-width": "0.8"
  }));
  queue.push({ depth: x + y + z * 0.03 + 0.25, node: g });
}

function label(text, x, y, z) {
  const p = iso(x, y, z);
  const t = node("text", { x: p[0] + 6, y: p[1] - 4, "font-size": "8" });
  t.textContent = text;
  queue.push({ depth: 100, node: t });
}

function buildBuilding() {
  slab(-1.8, -1.4, 0, 14.2, 12.2);
  edge(iso(-1.8, -1.4, 0.1), iso(12.4, -1.4, 0.1), "#eadfd6", 0.6, 0);
  slab(4.6, 8.15, 0.02, 1.7, 3.3, "path");
  box(4.0, 3.3, 0.12, 2.5, 2.2, 0.05, "garden");

  const xs = [0, 3.5, 6.7, 10];
  const ys = [0, 2.6, 5.4, 8];
  xs.forEach((x) => ys.forEach((y) => {
    const inside = x > 0.2 && x < 9.8 && y > 0.2 && y < 7.8 && !(x === 3.5 || x === 6.7 || y === 2.6 || y === 5.4);
    if (inside) return;
    column(x, y, 0.12, 8.05);
  }));

  [2.05, 3.6, 5.2, 6.85].forEach((z) => {
    xs.forEach((x) => edge(iso(x + 0.08, 0, z), iso(x + 0.08, 8, z), "#e7d5cc", 0.7, x));
    ys.forEach((y) => edge(iso(0, y + 0.08, z), iso(10, y + 0.08, z), "#e7d5cc", 0.7, y));
  });

  slab(0, 0, 2.05, 10, 2.45);
  slab(0, 2.45, 2.05, 3.35, 5.55, "Daily Life");
  slab(6.7, 2.45, 2.05, 3.3, 5.55, "Travel");
  slab(3.35, 6.55, 2.05, 3.35, 1.45);

  box(0.35, 3.3, 2.15, 2.5, 2.15, 1.25, "Daily Life");
  box(7.15, 2.9, 2.15, 2.35, 1.9, 1.2, "Travel");
  box(7.25, 5.15, 2.15, 1.85, 1.45, 1.05, "Money");
  box(0.2, 0.25, 2.15, 2.7, 1.7, 1.15, "Daily Life");

  for (let i = 0; i < 8; i += 1) {
    box(4.35, 8.15 + i * 0.4, 1.9 - i * 0.22, 1.7, 0.38, 0.1, null);
  }
  rail(0.15, 8.0, 2.15, 3.1, "x");
  rail(6.9, 8.0, 2.15, 3.0, "x");

  slab(0.15, 0.2, 3.6, 3.3, 4.6, "School");
  slab(6.85, 0.2, 3.6, 3.05, 4.2, "Entertainment");
  slab(3.45, 0.2, 3.6, 3.4, 1.7);

  box(0.35, 0.4, 3.7, 2.85, 2.35, 1.4, "School");
  box(0.7, 0.7, 5.1, 1.15, 0.7, 0.08, null);
  box(7.15, 0.45, 3.7, 2.45, 2.15, 1.35, "Entertainment");
  rail(3.5, 1.9, 3.7, 3.3, "x");

  slab(0.3, 0.3, 5.2, 3.15, 2.35, "Relationships");
  box(0.45, 0.45, 5.3, 2.7, 1.9, 1.2, "Relationships");
  slab(0.55, 2.35, 5.2, 2.5, 1.25, "Relationships");
  rail(0.55, 3.6, 5.3, 2.5, "x");

  box(3.7, 0.35, 5.3, 2.55, 1.85, 1.15, "Emotion");
  slab(6.9, 3.15, 5.15, 2.95, 2.15, "Smoking");
  rail(6.9, 5.3, 5.25, 2.95, "x");
  rail(9.85, 3.15, 5.25, 2.15, "y");
  box(8.15, 3.7, 5.25, 0.7, 0.45, 0.35, null);

  slab(0.7, 0.4, 6.85, 3.5, 1.9, "Existential");
  box(1.0, 0.6, 6.95, 1.7, 1.35, 1.05, "Existential");
  box(4.55, 0.45, 6.85, 1.7, 1.25, 0.85, "Attitude");
  rail(0.7, 2.3, 6.95, 3.2, "x");

  tree(4.5, 3.8, 0.18, 16);
  tree(5.6, 4.7, 0.18, 13);
  tree(5.0, 5.2, 0.18, 11);
  tree(1.6, 1.5, 6.95, 13);
  tree(2.8, 1.7, 6.95, 10);
  tree(7.8, 4.0, 5.25, 12);
  tree(8.8, 4.5, 5.25, 9);
  tree(2.4, 4.6, 2.15, 11);

  person(1.5, 1.3, 5.12);
  person(1.6, 3.0, 5.32);
  person(5.1, 9.4, 1.15);
  person(8.2, 1.4, 5.07);
  person(5.2, 7.3, 2.16);
  person(2.0, 1.2, 8.02);
  person(4.8, 4.2, 0.2);
  person(8.2, 4.2, 5.28);

  label("01  DAILY", -1.35, 5.6, 2.5);
  label("01  TRAVEL", 10.55, 5.4, 2.5);
  label("02  SCHOOL", -1.25, 1.4, 4.5);
  label("02  PLAY", 10.45, 1.5, 4.4);
  label("03  ROOM", -1.15, 1.5, 6.0);
  label("03  SMOKE", 10.6, 5.6, 5.4);

  Object.entries(ANCHOR_AT).forEach(([id, at]) => {
    anchors[id] = iso(at[0], at[1], at[2]);
    const dot = node("circle", {
      cx: anchors[id][0], cy: anchors[id][1], r: "1.7", fill: "#c4847c"
    });
    queue.push({ depth: 80, node: dot });
  });
}

function buildSite() {
  const g = node("g", { id: "site" });
  const ground = node("rect", {
    x: "0", y: "748", width: "1440", height: "152", fill: "#f7f4ef"
  });
  g.appendChild(ground);
  for (let i = 0; i < 8; i += 1) {
    g.appendChild(node("line", {
      x1: "40", y1: String(770 + i * 14),
      x2: "1400", y2: String(762 + i * 16),
      stroke: "#efe6dc", "stroke-width": "1"
    }));
  }
  g.appendChild(node("path", {
    d: "M80 860 C 220 820, 360 870, 520 830",
    fill: "none", stroke: "#e7dccb", "stroke-width": "8", "stroke-linecap": "round"
  }));
  g.appendChild(node("path", {
    d: "M980 800 C 1120 860, 1260 820, 1380 850",
    fill: "none", stroke: "#e5efe0", "stroke-width": "10", "stroke-linecap": "round"
  }));

  const plan = node("g", { transform: "translate(610 785)" });
  plan.appendChild(node("rect", {
    x: "0", y: "8", width: "168", height: "78", fill: "none",
    stroke: "#ddcfc6", "stroke-width": "0.8"
  }));
  plan.appendChild(node("rect", {
    x: "8", y: "16", width: "48", height: "52", fill: "#f4e0cc", stroke: "#e4d0c0", "stroke-width": "0.6"
  }));
  plan.appendChild(node("rect", {
    x: "112", y: "16", width: "46", height: "40", fill: "#d3ebe3", stroke: "#c5ddd4", "stroke-width": "0.6"
  }));
  plan.appendChild(node("rect", {
    x: "62", y: "28", width: "42", height: "28", fill: "#f7d3b0", stroke: "#e8c4a4", "stroke-width": "0.6"
  }));
  const cap = node("text", { x: "0", y: "0", "font-size": "8" });
  cap.textContent = "FOOTPRINT";
  plan.appendChild(cap);
  g.appendChild(plan);

  ["210", "640", "1080"].forEach((x, i) => {
    const t = node("text", { x, y: "812", "font-size": "11", fill: "#c48980" });
    t.textContent = "SITE";
    g.appendChild(t);
    g.appendChild(node("circle", {
      cx: String(Number(x) - 14), cy: "808", r: "3",
      fill: "none", stroke: "#c48980", "stroke-width": "0.8"
    }));
    if (i === 1) {
      const sub = node("text", { x: "560", y: "868", "font-size": "11", fill: "#8d7f76" });
      sub.textContent = "A MONTH CAN BE RECONSTRUCTED FROM THE THINGS WE REPEAT.";
      g.appendChild(sub);
    }
  });

  const corners = [iso(0, 0, 0), iso(10, 0, 0), iso(10, 8, 0.1), iso(0, 8, 0.1)];
  const planPts = [[618, 809], [770, 801], [778, 871], [610, 863]];
  corners.forEach((c, i) => {
    const line = node("line", {
      x1: c[0], y1: c[1], x2: planPts[i][0], y2: planPts[i][1],
      stroke: "rgba(180,150,140,0.45)", "stroke-width": "0.7", "stroke-dasharray": "1.2 3.2"
    });
    g.appendChild(line);
  });

  svg.insertBefore(g, svg.firstChild);
}

function flush() {
  const mass = node("g", { id: "mass" });
  queue.sort((a, b) => a.depth - b.depth);
  queue.forEach((item) => mass.appendChild(item.node));
  svg.appendChild(mass);
  queue.length = 0;
}

function buildLayer() {
  phrases.forEach((phrase) => {
    const at = NOTES[phrase.id];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "note";
    btn.dataset.cat = ZONE[phrase.id];
    btn.dataset.id = String(phrase.id);
    btn.dataset.x = String(at[0]);
    btn.dataset.y = String(at[1]);
    btn.innerHTML = `<span class="idx">${String(phrase.id).padStart(2, "0")}</span><h3>${phrase.phrase.toUpperCase()}</h3><span class="meta">${phrase.count} TIMES · ${ZONE[phrase.id].toUpperCase()}</span>`;
    layer.appendChild(btn);
  });

  SCRAPS.forEach((scrap) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "scrap";
    el.dataset.cat = ZONE[scrap.to];
    el.dataset.id = String(scrap.to);
    el.dataset.x = String(scrap.x);
    el.dataset.y = String(scrap.y);
    el.style.setProperty("--w", scrap.w + "px");
    el.style.setProperty("--r", scrap.r + "deg");
    el.innerHTML = `<img src="${scrap.src}" alt="">`;
    el.style.transform = `translate(-50%, -50%) rotate(${scrap.r}deg)`;
    layer.appendChild(el);
  });

  const key = document.createElement("div");
  key.className = "key";
  key.innerHTML = "<p>PROGRAM</p>";
  zoneOrder().forEach((name) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.cat = name;
    b.innerHTML = `<i style="background:${COLORS[name]}"></i>${name.toUpperCase()}`;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      locked = locked === name ? null : name;
      applyFilter();
    });
    key.appendChild(b);
  });
  document.getElementById("poster").appendChild(key);
}

function zoneOrder() {
  const seen = [];
  phrases.forEach((p) => {
    const zone = ZONE[p.id];
    if (!seen.includes(zone)) seen.push(zone);
  });
  return seen;
}

function toScreen(x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const m = svg.getScreenCTM();
  return pt.matrixTransform(m);
}

function toSvg(x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function layout() {
  const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  document.getElementById("poster").style.transform = `scale(${scale})`;
  layer.querySelectorAll("[data-x]").forEach((el) => {
    el.style.left = el.dataset.x + "px";
    el.style.top = el.dataset.y + "px";
  });
  const freqBox = document.getElementById("freq-box");
  const catBox = document.getElementById("cat-box");
  freqBox.style.left = "24px";
  freqBox.style.top = "786px";
  catBox.style.left = "268px";
  catBox.style.top = "792px";
  drawLeaders();
}

function drawLeaders() {
  let lines = svg.querySelector("#leaders");
  if (!lines) {
    lines = node("g", { id: "leaders" });
    svg.appendChild(lines);
  }
  lines.replaceChildren();
  [...layer.querySelectorAll(".note, .scrap")].forEach((el) => {
    const anchor = anchors[el.dataset.id];
    if (!anchor) return;
    const box = el.getBoundingClientRect();
    const from = toSvg(box.left + box.width * 0.5, box.top + box.height * 0.35);
    const path = node("path", { class: "leader", "data-cat": el.dataset.cat, "data-id": el.dataset.id });
    const mx = (from.x + anchor[0]) / 2;
    const my = Math.min(from.y, anchor[1]) - 18;
    path.setAttribute("d", `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${anchor[0].toFixed(1)} ${anchor[1].toFixed(1)}`);
    if (locked && el.dataset.cat !== locked) path.classList.add("is-quiet");
    if (el.classList.contains("is-selected")) path.classList.add("is-active");
    lines.appendChild(path);
  });
}

function categorySums() {
  const totals = {};
  phrases.forEach((p) => {
    totals[p.category] = (totals[p.category] || 0) + p.count;
  });
  return totals;
}

function buildCharts() {
  const ink = "#7d716a";
  const grid = "rgba(140, 120, 110, 0.18)";
  const sorted = phrases.slice().sort((a, b) => b.count - a.count || a.id - b.id);
  const freqCanvas = document.getElementById("frequency-chart");
  const catCanvas = document.getElementById("category-chart");
  freqCanvas.width = 420;
  freqCanvas.height = 192;
  catCanvas.width = 192;
  catCanvas.height = 192;
  frequencyChart = new Chart(freqCanvas, {
    type: "bar",
    data: {
      labels: sorted.map((p) => String(p.id).padStart(2, "0")),
      datasets: [{
        data: sorted.map((p) => p.count),
        backgroundColor: sorted.map(() => "#8a7d76"),
        borderWidth: 0,
        barPercentage: 0.72,
        categoryPercentage: 0.82
      }]
    },
    options: {
      indexAxis: "y",
      responsive: false,
      animation: false,
      devicePixelRatio: 1,
      plugins: { legend: { display: false }, tooltip: { enabled: false, external: externalTooltip } },
      scales: {
        x: {
          grid: { color: grid },
          border: { display: false },
          ticks: { color: ink, font: { size: 8, family: "IBM Plex Mono" }, maxTicksLimit: 4 }
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: ink, font: { size: 7, family: "IBM Plex Mono" } }
        }
      },
      onClick: (evt, els) => { if (els[0]) selectPhrase(sorted[els[0].index].id); }
    }
  });

  const totals = categorySums();
  const cats = Object.keys(totals);
  categoryChart = new Chart(catCanvas, {
    type: "doughnut",
    data: {
      labels: cats,
      datasets: [{
        data: cats.map((c) => totals[c]),
        backgroundColor: cats.map((c) => COLORS[c] || "#eee"),
        borderColor: "#fbfaf7",
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      cutout: "62%",
      animation: false,
      devicePixelRatio: 1,
      plugins: { legend: { display: false }, tooltip: { enabled: false, external: externalTooltip } },
      onClick: (evt, els) => {
        if (!els[0]) return;
        const name = cats[els[0].index];
        locked = locked === name ? null : name;
        applyFilter();
      }
    }
  });
}

function externalTooltip(context) {
  const { chart, tooltip } = context;
  if (!tooltip || tooltip.opacity === 0) {
    tip.hidden = true;
    return;
  }
  const item = tooltip.dataPoints && tooltip.dataPoints[0];
  if (!item) return;
  const canvas = chart.canvas.getBoundingClientRect();
  let title = item.label;
  let meta = `${item.raw} TIMES`;
  if (chart === frequencyChart) {
    const sorted = phrases.slice().sort((a, b) => b.count - a.count || a.id - b.id);
    const phrase = sorted[item.dataIndex];
    title = phrase.phrase;
    meta = `${phrase.count} TIMES · ${ZONE[phrase.id].toUpperCase()}`;
  } else {
    meta = `${item.raw} TIMES · ${String(item.label).toUpperCase()}`;
    title = item.label;
  }
  tip.innerHTML = `<p class="phrase">${title}</p><p class="meta">${meta}</p>`;
  tip.style.left = canvas.left + tooltip.caretX + 10 + "px";
  tip.style.top = canvas.top + tooltip.caretY - 10 + "px";
  tip.hidden = false;
}

function selectPhrase(id) {
  const zone = ZONE[id];
  const already = layer.querySelector(`.note.is-selected[data-id="${id}"]`);
  layer.querySelectorAll(".note").forEach((el) => el.classList.remove("is-selected"));
  if (already) {
    locked = null;
  } else {
    locked = zone;
    const note = layer.querySelector(`.note[data-id="${id}"]`);
    if (note) note.classList.add("is-selected");
  }
  applyFilter();
}

function applyFilter() {
  const cat = hover || locked;
  document.body.classList.toggle("is-filtering", Boolean(cat));
  document.querySelectorAll("[data-cat]").forEach((el) => {
    el.classList.toggle("is-on", !cat || el.dataset.cat === cat);
  });
  document.querySelectorAll(".key button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.cat === locked));
  });
  if (frequencyChart) {
    const sorted = phrases.slice().sort((a, b) => b.count - a.count || a.id - b.id);
    frequencyChart.data.datasets[0].backgroundColor = sorted.map((p) => {
      const on = !cat || ZONE[p.id] === cat;
      return on ? "#6f6560" : "#e6dfd8";
    });
    frequencyChart.update();
  }
  if (categoryChart) {
    const cats = Object.keys(categorySums());
    categoryChart.data.datasets[0].backgroundColor = cats.map((name) => {
      return !cat || name === cat ? (COLORS[name] || "#eee") : "#efeae4";
    });
    categoryChart.update();
  }
  drawLeaders();
}

function bind() {
  svg.addEventListener("mousemove", (e) => {
    const cat = (e.target.dataset && e.target.dataset.cat) || null;
    if (cat === hover) return;
    hover = cat;
    applyFilter();
  });
  svg.addEventListener("mouseleave", () => {
    if (!hover) return;
    hover = null;
    applyFilter();
  });
  svg.addEventListener("click", (e) => {
    const cat = e.target.dataset && e.target.dataset.cat;
    if (!cat) return;
    locked = locked === cat ? null : cat;
    layer.querySelectorAll(".note").forEach((el) => el.classList.remove("is-selected"));
    applyFilter();
  });
  layer.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[data-cat]");
    hover = el ? el.dataset.cat : null;
    applyFilter();
  });
  layer.addEventListener("mouseout", (e) => {
    if (e.target.closest("[data-cat]")) {
      hover = null;
      applyFilter();
    }
  });
  layer.addEventListener("click", (e) => {
    const el = e.target.closest(".note, .scrap");
    if (!el) return;
    selectPhrase(Number(el.dataset.id));
  });
  window.addEventListener("resize", layout);
}

function init() {
  svg.replaceChildren();
  layer.replaceChildren();
  buildBuilding();
  flush();
  buildSite();
  buildLayer();
  buildCharts();
  bind();
  layout();
  applyFilter();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    init();
    requestAnimationFrame(layout);
  });
} else {
  init();
}
