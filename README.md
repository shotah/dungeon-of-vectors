<p align="center">
  <img src="public/favicon.svg" width="96" height="96" alt="Dungeon of Vectors" />
</p>

<h1 align="center">Dungeon of Vectors</h1>

<p align="center">
  A first-person dungeon crawler built entirely with React and SVG vector graphics.<br/>
  No sprite sheets, no images -- every visual in the game is rendered with code.
</p>

<p align="center">
  <a href="https://dungeon.bldhosting.com"><strong>Play Now</strong></a>
</p>

---

Inspired by classic dungeon crawlers like Wizardry, the game features procedurally generated dungeons, turn-based combat, a four-character party system, and persistent saves via localStorage.

## Features

- **Pure SVG Graphics** -- All dungeon walls, monsters, character portraits, items, and UI elements are rendered as SVG, making the game resolution-independent and lightweight.
- **First-Person Dungeon View** -- Layered trapezoid-based perspective rendering creates the illusion of 3D corridors, doors, stairs, and treasure chests.
- **Procedural Dungeon Generation** -- Each floor is generated from a seed using room placement, corridor carving, and maze backfilling. Dungeons grow larger and more dangerous as you descend.
- **Turn-Based Combat** -- Speed-based turn order with Attack, Defend, Magic, Item, and Flee actions. Full keyboard support (number keys, WASD, arrow keys) so you never need the mouse.
- **Four Character Classes** -- Warrior, Mage, Rogue, and Cleric, each with unique stats, growth rates, and spell lists.
- **Loot and Equipment** -- Weapons, armor, accessories, and consumables drop from monsters and treasure chests.
- **Save System** -- Three manual save slots plus auto-save on floor transitions, all stored in localStorage.
- **Dynamic Audio** -- Web Audio API generates sound effects for footsteps, combat, doors, chests, and more -- no audio files needed.
- **Lazy Loading** -- Combat screen, inventory panel, and monster sprites are code-split with `React.lazy` for fast initial loads.
- **Minimap** -- Fog-of-war minimap reveals the dungeon as you explore.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| State | Zustand |
| Graphics | SVG (inline JSX) |
| Audio | Web Audio API |
| Persistence | localStorage |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Controls

### Exploration

| Key | Action |
|-----|--------|
| W / Arrow Up | Move forward |
| S / Arrow Down | Move backward |
| A / Arrow Left | Turn left |
| D / Arrow Right | Turn right |
| Space | Descend stairs |
| I | Open inventory |
| Escape | Close panels |

### Combat

| Key | Action |
|-----|--------|
| 1 / W | Attack |
| 2 | Defend |
| 3 | Magic |
| 4 | Item |
| 5 | Flee |
| A / D / Arrow Keys | Cycle targets |
| W / Enter | Confirm target |
| Escape | Cancel / Back |

## Project Structure

```
src/
  types/           Game-wide TypeScript interfaces
  utils/           Seeded RNG, direction helpers
  data/            Class definitions, monsters, items, spells
  systems/         Dungeon generator, combat engine, loot tables, audio
  stores/          Zustand game store
  components/
    screens/       Main menu, character creation, game screen, game over
    dungeon/       First-person SVG dungeon renderer
    combat/        Combat screen with keyboard + mouse support
    hud/           Minimap, party bar, message log, inventory
    svg/           Monster sprites, character portraits, item icons
    ui/            Reusable Button, StatBar, Modal components
```

## License

MIT
