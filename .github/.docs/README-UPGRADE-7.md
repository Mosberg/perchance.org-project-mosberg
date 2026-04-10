# Project Mosberg

![Project Mosberg Logo](src/img/logo-animated.webp)

A modular ecosystem of plugins and generators for [Perchance.org](https://perchance.org/).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform: Perchance](https://img.shields.io/badge/Platform-Perchance-blue.svg)](https://perchance.org)

## Table of Contents

- [Project Mosberg](#project-mosberg)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Goals](#goals)
  - [Core Plugins](#core-plugins)
    - [T2I Framework Plugin](#t2i-framework-plugin)
    - [T2I Styles (Default)](#t2i-styles-default)
    - [T2I Styles (Anime)](#t2i-styles-anime)
    - [T2I Styles (NSFW)](#t2i-styles-nsfw)
  - [Generators](#generators)
    - [AI Character Generator](#ai-character-generator)
    - [AI Pokemon Generator](#ai-pokemon-generator)
    - [AI Text-to-Image Generator](#ai-text-to-image-generator)
  - [Repository Structure](#repository-structure)
  - [Ecosystem Philosophy](#ecosystem-philosophy)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Project Mosberg is built for creators, tinkerers, and worldbuilders who want a more consistent and reusable Perchance workflow.

### Goals

- Build modular tools instead of one-off scripts
- Keep text-to-image workflows consistent and reusable
- Ship practical, ready-to-use generators
- Make everything easy to fork, remix, and extend

## Core Plugins

### T2I Framework Plugin

Flexible foundation for advanced text-to-image generator development.

- Live: [perchance.org/t2i-framework-plugin-moss](https://perchance.org/t2i-framework-plugin-moss)
- Edit: [perchance.org/t2i-framework-plugin-moss#edit](https://perchance.org/t2i-framework-plugin-moss#edit)

### T2I Styles (Default)

Reusable style presets for consistent prompt styling.

- Live: [perchance.org/t2i-styles-moss](https://perchance.org/t2i-styles-moss)
- Edit: [perchance.org/t2i-styles-moss#edit](https://perchance.org/t2i-styles-moss#edit)

### T2I Styles (Anime)

Anime-focused style presets for character and scene generation.

- Live: [perchance.org/t2i-styles-moss-anime](https://perchance.org/t2i-styles-moss-anime)
- Edit: [perchance.org/t2i-styles-moss-anime#edit](https://perchance.org/t2i-styles-moss-anime#edit)

### T2I Styles (NSFW)

Separate, opt-in style pack for NSFW workflows.

- Live: [perchance.org/t2i-styles-moss-nsfw](https://perchance.org/t2i-styles-moss-nsfw)
- Edit: [perchance.org/t2i-styles-moss-nsfw#edit](https://perchance.org/t2i-styles-moss-nsfw#edit)

## Generators

### AI Character Generator

Creates characters using appearance, personality, and lore modules.

- Live: [perchance.org/ai-character-generator-moss](https://perchance.org/ai-character-generator-moss)
- Edit: [perchance.org/ai-character-generator-moss#edit](https://perchance.org/ai-character-generator-moss#edit)

### AI Pokemon Generator

Generates original Pokemon species with types, abilities, and flavor text.

- Live: [perchance.org/ai-pokemon-generator-moss](https://perchance.org/ai-pokemon-generator-moss)
- Edit: [perchance.org/ai-pokemon-generator-moss#edit](https://perchance.org/ai-pokemon-generator-moss#edit)

### AI Text-to-Image Generator

General-purpose text-to-image generator powered by the Mosberg framework.

- Live: [perchance.org/ai-text-to-image-generator-moss](https://perchance.org/ai-text-to-image-generator-moss)
- Edit: [perchance.org/ai-text-to-image-generator-moss#edit](https://perchance.org/ai-text-to-image-generator-moss#edit)

## Repository Structure

```text
.
|-- index.html
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
`-- src/img/
```

## Ecosystem Philosophy

- Modular: Each plugin and generator acts as a reusable building block.
- Extensible: Tools are designed to be forked, remixed, and expanded.
- Consistent: Shared frameworks and style packs reduce duplication.
- Open: Public and remix-friendly by default.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request with a clear description.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Created by [Mosberg](https://github.com/Mosberg) (2026).
