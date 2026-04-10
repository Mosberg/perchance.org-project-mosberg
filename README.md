<p align="center">
  <img src="src/img/logo-animated.webp" alt="Project Mosberg logo" width="180" />
</p>

<h1 align="center">Project Mosberg - <a href="https://mosberg.github.io/perchance.org-project-mosberg/">Website</a></h1>

<p align="center">
  A modular ecosystem of plugins and generators for
  <a href="https://perchance.org/">Perchance.org</a>.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-1f8b4c.svg" alt="MIT License" /></a>
  <a href="https://perchance.org/"><img src="https://img.shields.io/badge/Platform-Perchance-0969da.svg" alt="Perchance Platform" /></a>
  <img src="https://img.shields.io/badge/Status-Active-2ea043.svg" alt="Status Active" />
  <img src="https://img.shields.io/badge/Made%20For-Worldbuilders-f57c00.svg" alt="Made For Worldbuilders" />
</p>

<p align="center">
  <a href="#overview"><strong>Overview</strong></a> •
  <a href="#core-plugins"><strong>Plugins</strong></a> •
  <a href="#generators"><strong>Generators</strong></a> •
  <a href="#repository-structure"><strong>Structure</strong></a> •
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

---

## Overview

> [!TIP]
> Project Mosberg is designed for creators, tinkerers, and worldbuilders who want reusable building blocks instead of one-off Perchance setups.

### What This Project Focuses On

- Modular tooling that can be mixed and remixed
- Consistent text-to-image style systems
- Practical generators that are ready to run
- Open, extensible architecture for community iteration

## Core Plugins

| Plugin               | What It Does                                                   | Live                                                    | Edit                                                          |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| T2I Framework Plugin | Foundation layer for advanced text-to-image generators         | [Open](https://perchance.org/t2i-framework-plugin-moss) | [Remix](https://perchance.org/t2i-framework-plugin-moss#edit) |
| T2I Styles (Default) | Reusable default style presets for consistent prompts          | [Open](https://perchance.org/t2i-styles-moss)           | [Remix](https://perchance.org/t2i-styles-moss#edit)           |
| T2I Styles (Anime)   | Anime-focused style presets for character and scene generation | [Open](https://perchance.org/t2i-styles-moss-anime)     | [Remix](https://perchance.org/t2i-styles-moss-anime#edit)     |
| T2I Styles (NSFW)    | Separate opt-in style pack for NSFW workflows                  | [Open](https://perchance.org/t2i-styles-moss-nsfw)      | [Remix](https://perchance.org/t2i-styles-moss-nsfw#edit)      |

## Generators

| Generator                  | What It Does                                                                | Live                                                          | Edit                                                                |
| -------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| AI Character Generator     | Generates characters with appearance, personality, and lore modules         | [Open](https://perchance.org/ai-character-generator-moss)     | [Remix](https://perchance.org/ai-character-generator-moss#edit)     |
| AI Pokemon Generator       | Generates original Pokemon species with typings, abilities, and flavor text | [Open](https://perchance.org/ai-pokemon-generator-moss)       | [Remix](https://perchance.org/ai-pokemon-generator-moss#edit)       |
| AI Text-to-Image Generator | General-purpose text-to-image generator using the Mosberg framework         | [Open](https://perchance.org/ai-text-to-image-generator-moss) | [Remix](https://perchance.org/ai-text-to-image-generator-moss#edit) |

## Repository Structure

<details>
<summary><strong>Expand folder map</strong></summary>

```text
.
|-- index.html
|-- LICENSE
|-- README.md
|-- perchance.org/
|   |-- generators/
|   |   |-- ai-character-generator-moss/
|   |   |-- ai-pokemon-generator-moss/
|   |   `-- ai-text-to-image-generator-moss/
|   `-- plugins/
|       |-- t2i-framework-plugin-moss/
|       |-- t2i-styles-moss/
|       |-- t2i-styles-moss-anime/
|       `-- t2i-styles-moss-nsfw/
`-- src/
    `-- img/
```

</details>

## Ecosystem Philosophy

| Principle  | Meaning                                                           |
| ---------- | ----------------------------------------------------------------- |
| Modular    | Plugins and generators are designed as composable building blocks |
| Extensible | Every module can be forked, remixed, and expanded                 |
| Consistent | Shared frameworks and style packs reduce duplication              |
| Open       | Public and remix-friendly by default                              |

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make focused, documented changes.
4. Open a pull request with a clear summary.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Created by <a href="https://github.com/Mosberg">Mosberg</a> (2026)
</p>
