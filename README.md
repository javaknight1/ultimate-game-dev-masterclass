# The Ultimate Game Development Masterclass

A self-contained game-dev course — single HTML file, no server required. Retro-arcade/CRT theme, sidebar navigation, progress tracking, and a hands-on **🎮 Build This** game (or exercise) at the end of every lesson.

**~193 lessons. Learn the fundamentals, pick ONE path, master it, and build a portfolio across every genre.**

- **00 · Foundations** — engine-agnostic concepts (game loop, vectors, sprites, collision & physics, animation, ECS, state machines, tilemaps, audio, AI, shaders, production) — ending with **Choose Your Path**.

Then pick **one** of six comprehensive mastery tracks (each ~24–30 lessons covering the tool's *ins and outs* plus a representative game for **every major genre**):

- **01 · Godot** (GDScript) · **02 · Unity** (C#) · **03 · Unreal** (Blueprints + C++)
- **04 · C++** (raylib) · **05 · Python** (Pygame) · **06 · JavaScript** (HTML5 Canvas)

Each path tours: classic arcade, side-scroller, metroidvania, top-down adventure, twin-stick, **first-person shooter**, **third-person shooter**, **racing/cars**, match-3 + physics puzzle, RPG, strategy/tower-defense, endless runner, fighting, rhythm, roguelike (procedural), and simulation/sandbox — plus AI, shaders/VFX, optimization, save systems, multiplayer basics, and a capstone. (In the from-scratch language tracks, 3D genres are taught the real way — raycasting FPS, pseudo-3D racing.)

Then, whatever path you chose:

- **07 · 3D Art** with Blender · **08 · Game Audio** · **09 · Ship It** (deploy, publish, market, monetize)

Every Build-This is **progressive** — it extends a game from a previous lesson or starts a new genre — so you finish with a broad, multi-genre portfolio built in one tool.

## Build

Lesson content lives in `data/`. Each mastery track is split into chunk files (`p1.c1.json`, `p1.c2.json`, …); other parts are single files (`p0.json`, etc.). The single-file app is assembled (chunks merged, part order + numbering applied canonically, cover prepended) from `index.template.html` into `index.html`:

```bash
node build.js
```

`index.template.html` holds the engine shell with the `/*__LESSONS__*/[]` marker, so the build is idempotent and re-runnable. No runtime dependencies.

## Hosting

Static — deploys to Cloudflare via the included `wrangler.jsonc` (Workers Static Assets, directory `.`).
