#!/usr/bin/env node
/*
 * build.js — assembles data/<part>.json into the single-file index.html.
 * Replaces the `/​*__LESSONS__*​/[]` marker with the full lesson array.
 * Part order + numbering is canonical here (independent of how writers numbered).
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const HTML = path.join(ROOT, 'index.html');
const DATA = path.join(ROOT, 'data');

// [data-file id, sidebar part label, part number]  — order = display order
const ORDER = [
  ['p0', '00 · Foundations', 0],
  ['p1', '01 · Godot', 1],
  ['p2', '02 · Unity', 2],
  ['p3', '03 · Unreal', 3],
  ['p4', '04 · C++ (from scratch)', 4],
  ['p5', '05 · Python (from scratch)', 5],
  ['p6', '06 · JavaScript (from scratch)', 6],
  ['p8', '07 · 3D Art (Blender)', 7],
  ['p9', '08 · Game Audio', 8],
  ['p7', '09 · Ship It', 9],
];

const cover = {
  id: 'cover', part: 'START', nav: 'Welcome', cover: true, html: `
<div class="cover">
<span class="lesson-kicker">press start · zero → shipped game</span>
<h2 class="lesson-title">make<br>games.</h2>
<p class="lede">The complete path from "I've never made a game" to shipping one. Foundations that work in any engine, full courses in three engines (Godot, Unity, Unreal) and three from-scratch languages (C++, Python, JavaScript), 3D art in Blender, game audio, and how to publish &amp; monetize. Every lesson ends with a small game you actually build.</p>
<div class="grid2">
  <div class="card"><div class="ct">🎮 Build every step</div><p>Each lesson ends with a "Build This" — a small playable game using the skill you just learned. You learn game dev by making games, not by reading about them.</p></div>
  <div class="card"><div class="ct">🧠 Engine-agnostic first</div><p>Part 00 teaches the universal ideas — the game loop, sprites, collision, vectors, state machines — so every engine afterward just clicks.</p></div>
  <div class="card"><div class="ct">🛠 Three engines, three languages</div><p>Full courses in Godot, Unity, and Unreal — plus making games from scratch in C++, Python, and JavaScript. Pick your path or learn them all.</p></div>
  <div class="card"><div class="ct">🚀 Art, audio &amp; shipping</div><p>3D modeling in Blender, sound design &amp; music, then deploying, marketing, and monetizing your finished game.</p></div>
</div>
<h3>How this course is structured</h3>
<p>Ten parts that build on each other. Start with Foundations, then dive into whichever engine or language calls to you — each is self-contained. Mark lessons complete as you go; your progress bar lives in the sidebar.</p>
<div class="box tip"><div class="bt">The one rule.</div> Finish each "Build This." A game you can actually play, however tiny, teaches more than a chapter you only read.</div>
</div>
` };

function main() {
  const all = [cover];
  let total = 0;
  for (const [id, label, n] of ORDER) {
    const file = path.join(DATA, id + '.json');
    if (!fs.existsSync(file)) { console.error('MISSING data/' + id + '.json'); process.exit(1); }
    let arr;
    try { arr = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (e) { console.error('BAD JSON in data/' + id + '.json: ' + e.message); process.exit(1); }
    arr.forEach((les, i) => {
      les.part = label;
      les.num = n + '.' + (i + 1);
      les.kicker = 'Part ' + String(n).padStart(2, '0') + ' · Lesson ' + (i + 1);
      all.push(les);
    });
    total += arr.length;
    console.log('  ' + label.padEnd(28) + arr.length + ' lessons');
  }
  let html = fs.readFileSync(HTML, 'utf8');
  const MARK = '/*__LESSONS__*/[]';
  if (!html.includes(MARK)) { console.error('marker not found in index.html'); process.exit(1); }
  let json = JSON.stringify(all);
  json = json.replace(/<\/script/gi, '<\\/script'); // never break the inline <script>
  html = html.replace(MARK, () => json);
  fs.writeFileSync(HTML, html);
  console.log('\nInjected ' + total + ' lessons (+cover) across ' + ORDER.length + ' parts → index.html (' + Math.round(html.length / 1024) + ' KB)');
}
main();
