const CATS = [
  { id: "schoolWork", name: "SCHOOL / WORK", color: "#e4d07a" },
  { id: "dailyLife", name: "DAILY LIFE", color: "#8eb0d0" },
  { id: "smoking", name: "SMOKING", color: "#86b896" },
  { id: "relationships", name: "RELATIONSHIPS", color: "#e3a8bc" },
  { id: "entertainment", name: "ENTERTAINMENT", color: "#e0a86a" },
  { id: "inner", name: "EMOTION / INNER WORLD", color: "#b5a6d6" }
];

const PLACE = {
  1: { x: 0.05, y: 118, label: "n" },
  2: { x: 0.20, y: 86, label: "n" },
  3: { x: 0.36, y: 48, label: "n" },
  13: { x: 0.50, y: 132, label: "n" },
  4: { x: 0.66, y: 78, label: "n" },
  7: { x: 0.84, y: 52, label: "n" },
  5: { x: 0.14, y: 248, label: "n" },
  11: { x: 0.30, y: 210, label: "n" },
  20: { x: 0.44, y: 248, label: "s" },
  14: { x: 0.58, y: 228, label: "n" },
  8: { x: 0.76, y: 196, label: "n" },
  15: { x: 0.94, y: 148, label: "n" },
  9: { x: 0.02, y: 360, label: "s" },
  19: { x: 0.18, y: 360, label: "n" },
  16: { x: 0.34, y: 360, label: "n" },
  21: { x: 0.50, y: 372, label: "s" },
  17: { x: 0.66, y: 330, label: "n" },
  6: { x: 0.84, y: 300, label: "s" },
  12: { x: 0.10, y: 470, label: "n" },
  10: { x: 0.90, y: 400, label: "w" },
  18: { x: 0.78, y: 470, label: "n" }
};

const ANNOS = [
  { date: "2026-09-07", text: "“What does this mean?” peaked this week. Midterm season." },
  { date: "2026-09-14", text: "A very smoking-heavy week." },
  { date: "2026-09-21", text: "A lot of “I miss you.” Not a great week emotionally." },
  { date: "2026-09-28", text: "Travel and money phrases increased." },
  { date: "2026-10-03", text: "“Help me send an email.” Again." }
];

const SVG_W = 1180;
const SVG_H = 820;
const PAD_L = 168;
const PAD_R = 36;
const AXIS_Y = 748;

const state = {
  phraseId: null,
  category: "ALL",
  date: null,
  hoverPhrase: null,
  hoverDate: null,
  hoverMatrix: null
};

const flow = document.getElementById("flow");
const tip = document.getElementById("tip");
const detail = document.getElementById("detail");
const filters = document.getElementById("filters");
let dailyChart = null;
let matrixChart = null;

const dates = [];
{
  const cursor = new Date(2026, 8, 5);
  const end = new Date(2026, 9, 5);
  while (cursor <= end) {
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const d = String(cursor.getDate()).padStart(2, "0");
    dates.push(`${cursor.getFullYear()}-${m}-${d}`);
    cursor.setDate(cursor.getDate() + 1);
  }
}

phrases.forEach((phrase) => {
  phrase.count = dailyOccurrences
    .filter((row) => row.phraseId === phrase.id)
    .reduce((sum, row) => sum + row.count, 0);
});

function catOf(id) {
  return CATS.find((cat) => cat.id === id);
}

function phraseById(id) {
  return phrases.find((phrase) => phrase.id === id);
}

function rowsOn(date, phraseId) {
  return dailyOccurrences.filter((row) => row.date === date && (phraseId == null || row.phraseId === phraseId));
}

function dayTotal(date) {
  return rowsOn(date).reduce((sum, row) => sum + row.count, 0);
}

function categoryTotal(date, category) {
  return rowsOn(date)
    .filter((row) => phraseById(row.phraseId).category === category)
    .reduce((sum, row) => sum + row.count, 0);
}

function activeDays(phraseId) {
  return new Set(dailyOccurrences.filter((row) => row.phraseId === phraseId).map((row) => row.date)).size;
}

function dateX(index) {
  const inner = SVG_W - PAD_L - PAD_R;
  return PAD_L + inner * ((index + 0.5) / dates.length);
}

function wobble(seed, amount) {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return (n - Math.floor(n) - 0.5) * amount;
}

function radius(count) {
  return 7 + Math.sqrt(count) * 3.15;
}

function labelDate(iso) {
  const [, m, d] = iso.split("-");
  const month = m === "09" ? "Sep" : "Oct";
  return `${month} ${d}`;
}

function focusIds() {
  if (state.hoverPhrase) return new Set([state.hoverPhrase]);
  if (state.phraseId) return new Set([state.phraseId]);
  if (state.hoverMatrix) {
    const ids = rowsOn(state.hoverMatrix.date)
      .filter((row) => phraseById(row.phraseId).category === state.hoverMatrix.category)
      .map((row) => row.phraseId);
    return new Set(ids);
  }
  if (state.category !== "ALL") {
    return new Set(phrases.filter((phrase) => phrase.category === state.category).map((phrase) => phrase.id));
  }
  const day = state.hoverDate || state.date;
  if (day) return new Set(rowsOn(day).map((row) => row.phraseId));
  return null;
}

function activeDay() {
  return state.hoverDate || state.date || (state.hoverMatrix && state.hoverMatrix.date) || null;
}

function svgEl(name, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function labelLines(text) {
  if (text.length <= 20) return [text];
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > 18) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function buildFlow() {
  flow.setAttribute("viewBox", `0 0 ${SVG_W} ${SVG_H}`);
  const guides = svgEl("g", { id: "guides" });
  const links = svgEl("g", { id: "links" });
  const nodes = svgEl("g", { id: "nodes" });
  const hits = svgEl("g", { id: "day-hits" });
  const wash = svgEl("rect", {
    id: "day-wash", x: 0, y: 28, width: 18, height: AXIS_Y - 28,
    fill: "rgba(36,31,28,0.045)", visibility: "hidden"
  });
  guides.appendChild(wash);
  dates.forEach((date, index) => {
    const x = dateX(index);
    guides.appendChild(svgEl("line", {
      x1: x, y1: 36, x2: x, y2: AXIS_Y,
      stroke: "rgba(60,50,40,0.08)", "stroke-dasharray": "1 4", "stroke-width": "1"
    }));
    if (index % 7 === 0 || index === dates.length - 1) {
      const text = svgEl("text", { class: "axis", x, y: AXIS_Y + 22, "text-anchor": "middle" });
      text.textContent = labelDate(date);
      guides.appendChild(text);
    }
    const hit = svgEl("rect", {
      class: "day-hit", x: x - 14, y: AXIS_Y - 6, width: 28, height: 34, fill: "transparent"
    });
    hit.dataset.date = date;
    hits.appendChild(hit);
  });
  guides.appendChild(svgEl("line", {
    x1: PAD_L, y1: AXIS_Y, x2: SVG_W - PAD_R, y2: AXIS_Y,
    stroke: "rgba(40,34,30,0.35)", "stroke-width": "1"
  }));

  phrases.forEach((phrase) => {
    const spot = PLACE[phrase.id];
    const cx = PAD_L + spot.x * (SVG_W - PAD_L - PAD_R);
    const cy = spot.y;
    const r = radius(phrase.count);
    const color = catOf(phrase.category).color;
    dailyOccurrences.filter((row) => row.phraseId === phrase.id).forEach((row) => {
      const x2 = dateX(dates.indexOf(row.date));
      const bend = wobble(phrase.id * 17 + dates.indexOf(row.date), 36);
      const d = `M ${cx} ${cy + r * 0.2} C ${cx + bend} ${(cy + AXIS_Y) / 2} ${x2 - bend * 0.35} ${AXIS_Y - 90} ${x2} ${AXIS_Y}`;
      const path = svgEl("path", {
        class: "link",
        d,
        stroke: color,
        "stroke-width": String(0.35 + Math.min(row.count, 8) * 0.28),
        "data-id": String(phrase.id),
        "data-date": row.date
      });
      const hit = svgEl("path", {
        class: "link-hit",
        d,
        stroke: "transparent",
        "stroke-width": "8",
        "data-id": String(phrase.id),
        "data-date": row.date
      });
      links.append(path, hit);
    });
    const group = svgEl("g", { class: "node", "data-id": String(phrase.id) });
    group.appendChild(svgEl("circle", {
      cx, cy, r, fill: color, stroke: "#241f1c", "stroke-width": "1.1"
    }));
    if (phrase.count >= 26) {
      group.appendChild(svgEl("path", {
        d: `M ${cx - r * 0.45} ${cy - r * 0.2} q ${r * 0.4} ${r * 0.15} ${r * 0.9} ${-r * 0.05}`,
        fill: "none", stroke: "rgba(36,31,28,0.35)", "stroke-width": "0.7"
      }));
    }
    const lines = labelLines(phrase.phrase);
    const size = phrase.count > 20 ? 20 : 15;
    const lead = size - 3;
    lines.forEach((line, index) => {
      let x = cx;
      let y = cy - r - 8 - (lines.length - 1 - index) * lead;
      let anchor = "middle";
      if (spot.label === "e") {
        x = cx + r + 8;
        y = cy + 4 - ((lines.length - 1) / 2 - index) * lead;
        anchor = "start";
      } else if (spot.label === "w") {
        x = cx - r - 8;
        y = cy + 4 - ((lines.length - 1) / 2 - index) * lead;
        anchor = "end";
      } else if (spot.label === "s") {
        y = cy + r + 16 + index * lead;
      }
      const label = svgEl("text", {
        x, y, "text-anchor": anchor, "font-size": String(size)
      });
      label.textContent = line;
      group.appendChild(label);
    });
    nodes.appendChild(group);
  });

  flow.append(guides, links, nodes, hits);
}

function buildAnnos() {
  const row = document.getElementById("annos");
  ANNOS.forEach((item) => {
    const index = dates.indexOf(item.date);
    const p = document.createElement("p");
    p.className = "anno";
    const pct = ((index + 0.5) / dates.length) * 100;
    p.style.left = `${pct}%`;
    p.style.top = index % 2 === 0 ? "0" : "52px";
    if (pct > 78) {
      p.style.transform = "translateX(-100%)";
      p.style.textAlign = "right";
    }
    p.innerHTML = `<strong>${labelDate(item.date).toUpperCase()}</strong>${item.text}`;
    row.appendChild(p);
  });
}

function buildFilters() {
  [["ALL", "ALL"], ...CATS.map((cat) => [cat.id, cat.name])].forEach(([id, name]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.cat = id;
    button.textContent = name;
    button.addEventListener("click", () => {
      state.category = state.category === id ? "ALL" : id;
      state.phraseId = null;
      state.date = null;
      render();
    });
    filters.appendChild(button);
  });
  const reset = document.createElement("button");
  reset.type = "button";
  reset.dataset.cat = "RESET";
  reset.textContent = "RESET";
  reset.addEventListener("click", () => {
    state.phraseId = null;
    state.category = "ALL";
    state.date = null;
    state.hoverPhrase = null;
    state.hoverDate = null;
    state.hoverMatrix = null;
    tip.hidden = true;
    render();
  });
  filters.appendChild(reset);
}

function showTip(html, x, y) {
  tip.innerHTML = html;
  tip.hidden = false;
  const left = Math.min(x + 14, window.innerWidth - 280);
  const top = Math.min(y + 14, window.innerHeight - 140);
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
}

function phraseTip(phrase) {
  return `<p class="phrase">${phrase.phrase}</p><p class="meta">${phrase.count} TIMES · ${catOf(phrase.category).name}</p><p class="note">${phrase.note}</p>`;
}

function dayLines(date) {
  const rows = rowsOn(date).slice().sort((a, b) => b.count - a.count);
  const lines = rows.map((row) => {
    const phrase = phraseById(row.phraseId);
    return `<p class="phrase">${phrase.phrase}</p><p class="meta">${row.count} ${row.count === 1 ? "TIME" : "TIMES"}</p>`;
  }).join("");
  return `<p class="meta">${labelDate(date).toUpperCase()} · ${dayTotal(date)} TIMES</p>${lines}`;
}

function renderDetail() {
  if (state.phraseId) {
    const phrase = phraseById(state.phraseId);
    detail.hidden = false;
    detail.innerHTML = `
      <p class="kicker">PHRASE</p>
      <h2>${phrase.phrase}</h2>
      <p class="meta">${phrase.count} TIMES</p>
      <p class="meta">CATEGORY<br>${catOf(phrase.category).name}</p>
      <p class="meta">ACTIVE DAYS<br>${activeDays(phrase.id)} DAYS</p>
      <p class="note">${phrase.note}</p>`;
    return;
  }
  if (state.date) {
    const rows = rowsOn(state.date).slice().sort((a, b) => b.count - a.count);
    const byCat = {};
    rows.forEach((row) => {
      const category = phraseById(row.phraseId).category;
      byCat[category] = (byCat[category] || 0) + row.count;
    });
    const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    detail.hidden = false;
    detail.innerHTML = `
      <p class="kicker">DAY</p>
      <h2>${labelDate(state.date).toUpperCase()}</h2>
      <p class="meta">TOTAL OCCURRENCES: ${dayTotal(state.date)}</p>
      <p class="meta">MOST ACTIVE<br>${topCat ? catOf(topCat[0]).name : "—"}</p>
      <p class="meta">TOP PHRASES</p>
      ${rows.slice(0, 4).map((row) => `<p class="note">${phraseById(row.phraseId).phrase} × ${row.count}</p>`).join("")}`;
    return;
  }
  detail.hidden = true;
  detail.innerHTML = "";
}

function paintSvg() {
  const focus = focusIds();
  const day = activeDay();
  const lockPhrase = state.hoverPhrase || state.phraseId;
  flow.querySelectorAll(".link").forEach((path) => {
    const on = !focus || focus.has(Number(path.dataset.id));
    const dayOn = !day || path.dataset.date === day || lockPhrase;
    path.style.opacity = on && dayOn ? (focus ? "0.92" : "0.24") : "0.04";
  });
  flow.querySelectorAll(".node").forEach((node) => {
    const on = !focus || focus.has(Number(node.dataset.id));
    node.style.opacity = on ? "1" : "0.14";
  });
  const wash = document.getElementById("day-wash");
  if (day) {
    const x = dateX(dates.indexOf(day));
    wash.setAttribute("x", String(x - 11));
    wash.setAttribute("width", "22");
    wash.setAttribute("visibility", "visible");
  } else {
    wash.setAttribute("visibility", "hidden");
  }
  filters.querySelectorAll("button").forEach((button) => {
    const pressed = button.dataset.cat !== "RESET" && button.dataset.cat === state.category;
    button.setAttribute("aria-pressed", String(pressed));
  });
  renderDetail();
}

function dotColor(dataset, point) {
  const cat = catOf(dataset.categoryId);
  const locked = state.hoverPhrase || state.phraseId;
  if (locked) {
    const phrase = phraseById(locked);
    if (phrase.category !== dataset.categoryId) return "rgba(220,214,206,0.28)";
    const hit = dailyOccurrences.some((row) => row.phraseId === phrase.id && row.date === point.date);
    return hit ? cat.color : "rgba(220,214,206,0.4)";
  }
  if (state.hoverMatrix && state.hoverMatrix.category !== dataset.categoryId) return "rgba(220,214,206,0.28)";
  if (state.category !== "ALL" && dataset.categoryId !== state.category) return "rgba(220,214,206,0.28)";
  return cat.color;
}

function paint() {
  paintSvg();
  paintCharts();
}

let chartLock = false;

function paintCharts() {
  if (!dailyChart || !matrixChart || chartLock) return;
  chartLock = true;
  matrixChart.data.datasets.forEach((dataset) => {
    dataset.backgroundColor = dataset.data.map((point) => dotColor(dataset, point));
  });
  matrixChart.update("none");
  dailyChart.draw();
  chartLock = false;
}

const dayMark = {
  id: "dayMark",
  afterDatasetsDraw(chart) {
    const day = activeDay();
    if (!day) return;
    const bar = chart.getDatasetMeta(0).data[dates.indexOf(day)];
    if (!bar) return;
    const { ctx, chartArea } = chart;
    ctx.save();
    ctx.fillStyle = "rgba(36,31,28,0.06)";
    ctx.fillRect(bar.x - 8, chartArea.top, 16, chartArea.bottom - chartArea.top);
    ctx.restore();
  }
};

const alignPlot = {
  id: "alignPlot",
  beforeLayout(chart) {
    const left = chart.width * (PAD_L / SVG_W);
    const right = chart.width * (PAD_R / SVG_W);
    chart.options.layout.padding.right = right;
    chart.options.scales.y.afterFit = (scale) => {
      scale.width = left;
    };
  }
};

function buildCharts() {
  const ink = "#6f675f";
  const mono = { size: 9, family: "IBM Plex Mono" };
  const dateTick = (value) => {
    const index = Math.round(value);
    if (Math.abs(value - index) > 0.01 || index < 0 || index >= dates.length) return "";
    return index % 7 === 0 || index === dates.length - 1 ? labelDate(dates[index]) : "";
  };

  dailyChart = new Chart(document.getElementById("daily-chart"), {
    type: "bar",
    plugins: [dayMark],
    data: {
      labels: dates,
      datasets: [{
        data: dates.map(dayTotal),
        backgroundColor: "rgba(90,82,74,0.28)",
        borderWidth: 0,
        barPercentage: 0.28,
        categoryPercentage: 0.9
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { display: false }
        },
        y: { display: false }
      },
      onHover: (event, elements) => {
        if (chartLock) return;
        const date = elements[0] ? dates[elements[0].index] : null;
        if (date === state.hoverDate && !state.hoverPhrase && !state.hoverMatrix) return;
        state.hoverDate = date;
        state.hoverPhrase = null;
        state.hoverMatrix = null;
        if (date) showTip(dayLines(date), event.native.clientX, event.native.clientY);
        else tip.hidden = true;
        paintSvg();
        chartLock = true;
        dailyChart.draw();
        chartLock = false;
      },
      onClick: (event, elements) => {
        if (!elements[0]) return;
        const date = dates[elements[0].index];
        state.date = state.date === date ? null : date;
        state.phraseId = null;
        state.hoverPhrase = null;
        paint();
      }
    }
  });

  matrixChart = new Chart(document.getElementById("matrix-chart"), {
    type: "bubble",
    plugins: [alignPlot],
    data: {
      datasets: CATS.map((cat, index) => ({
        categoryId: cat.id,
        data: dates.flatMap((date, x) => {
          const count = categoryTotal(date, cat.id);
          if (!count) return [];
          return [{ x, y: CATS.length - 1 - index, r: Math.min(15, 3.2 + count * 1.05), count, date }];
        }),
        backgroundColor: cat.color,
        borderWidth: 0
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: {
          min: -0.5,
          max: dates.length - 0.5,
          grid: { color: "rgba(60,50,40,0.07)", tickLength: 0, borderDash: [1, 4] },
          border: { display: false },
          afterBuildTicks(scale) {
            scale.ticks = dates.map((date, value) => ({ value }));
          },
          ticks: {
            color: ink,
            font: mono,
            autoSkip: false,
            maxRotation: 0,
            callback: dateTick
          }
        },
        y: {
          min: -0.55,
          max: CATS.length - 0.45,
          grid: { display: false },
          border: { display: false },
          afterBuildTicks(scale) {
            scale.ticks = CATS.map((cat, value) => ({ value }));
          },
          ticks: {
            color: ink,
            font: mono,
            callback: (value) => {
              const cat = CATS[CATS.length - 1 - value];
              return cat ? cat.name : "";
            }
          }
        }
      },
      onHover: (event, elements) => {
        if (chartLock) return;
        if (!elements[0]) {
          if (!state.hoverMatrix) return;
          state.hoverMatrix = null;
          tip.hidden = true;
          paint();
          return;
        }
        const point = matrixChart.data.datasets[elements[0].datasetIndex].data[elements[0].index];
        const category = matrixChart.data.datasets[elements[0].datasetIndex].categoryId;
        const key = `${point.date}-${category}`;
        if (state.hoverMatrix && state.hoverMatrix.key === key) return;
        state.hoverMatrix = { date: point.date, category, key };
        state.hoverPhrase = null;
        state.hoverDate = null;
        const rows = rowsOn(point.date)
          .filter((row) => phraseById(row.phraseId).category === category)
          .sort((a, b) => b.count - a.count);
        const body = rows.map((row) => `<p class="phrase">${phraseById(row.phraseId).phrase} × ${row.count}</p>`).join("");
        const word = point.count === 1 ? "OCCURRENCE" : "OCCURRENCES";
        showTip(`<p class="meta">${labelDate(point.date).toUpperCase()} · ${catOf(category).name}</p>${body}<p class="meta">${point.count} ${word}</p>`, event.native.clientX, event.native.clientY);
        paint();
      },
      onClick: (event, elements) => {
        if (!elements[0]) return;
        const point = matrixChart.data.datasets[elements[0].datasetIndex].data[elements[0].index];
        state.date = state.date === point.date ? null : point.date;
        state.phraseId = null;
        state.hoverPhrase = null;
        paint();
      }
    }
  });
}

function bindFlow() {
  flow.addEventListener("mousemove", (event) => {
    const node = event.target.closest(".node");
    const day = event.target.closest("[data-date]");
    if (node) {
      const id = Number(node.dataset.id);
      if (state.hoverPhrase !== id) {
        state.hoverPhrase = id;
        state.hoverDate = null;
        state.hoverMatrix = null;
        showTip(phraseTip(phraseById(id)), event.clientX, event.clientY);
        paint();
      }
      return;
    }
    if (day && day.dataset.date) {
      if (state.hoverDate !== day.dataset.date || state.hoverPhrase || state.hoverMatrix) {
        state.hoverPhrase = null;
        state.hoverMatrix = null;
        state.hoverDate = day.dataset.date;
        showTip(dayLines(day.dataset.date), event.clientX, event.clientY);
        paint();
      }
      return;
    }
    if (state.hoverPhrase || state.hoverDate) {
      state.hoverPhrase = null;
      state.hoverDate = null;
      tip.hidden = true;
      paint();
    }
  });
  flow.addEventListener("mouseleave", () => {
    if (!state.hoverPhrase && !state.hoverDate) return;
    state.hoverPhrase = null;
    state.hoverDate = null;
    tip.hidden = true;
    paint();
  });
  flow.addEventListener("click", (event) => {
    const node = event.target.closest(".node");
    const day = event.target.closest("[data-date]");
    if (node) {
      const id = Number(node.dataset.id);
      state.phraseId = state.phraseId === id ? null : id;
      state.date = null;
      state.hoverDate = null;
      state.category = "ALL";
      paint();
      return;
    }
    if (day && day.dataset.date) {
      state.date = state.date === day.dataset.date ? null : day.dataset.date;
      state.phraseId = null;
      paint();
    }
  });
}

function render() {
  paint();
}

function init() {
  buildFlow();
  buildAnnos();
  buildFilters();
  buildCharts();
  bindFlow();
  render();
}

init();
