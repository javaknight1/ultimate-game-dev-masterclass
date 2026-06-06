# The Ultimate Game Development Masterclass

A self-contained game-dev course — single HTML file, no server required. Retro-arcade/CRT theme, sidebar navigation, progress tracking, and a hands-on **🎮 Build This** mini-game (or exercise) at the end of every lesson.

**10 parts · 86 lessons · zero → shipped game:**

- **00 · Foundations** — engine-agnostic concepts: the game loop, vectors, sprites, collision & physics, animation, ECS, state machines, tilemaps, audio, AI/pathfinding, shaders, and the production workflow
- **01 · Godot** (GDScript) — full course
- **02 · Unity** (C#) — full course
- **03 · Unreal Engine 5** (Blueprints + C++) — full course
- **04 · C++ from scratch** (raylib / SFML)
- **05 · Python from scratch** (Pygame)
- **06 · JavaScript from scratch** (HTML5 Canvas)
- **07 · 3D Art** with Blender
- **08 · Game Audio** — sound design & music
- **09 · Ship It** — deploy, publish (itch.io / Steam / mobile / web), market, and monetize

Every engine/language lesson ends with a small playable game using the new skill (Pong → Breakout → shooter → capstone); Foundations lessons end with quick exercises; the Ship It part ends with action checklists.

## Build

Lesson content lives in `data/<part>.json`. The single-file app is assembled (part order + numbering applied canonically) with:

```bash
node build.js
```

No runtime dependencies. The served artifact is the pre-built `index.html`.

## Hosting

Static — deploys to Cloudflare via the included `wrangler.jsonc` (Workers Static Assets, directory `.`).
