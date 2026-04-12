# Changelog

## 0.6.1

- Added runtime extension support (`extension.js`) for IntelliSense and editor tooling.
- Added context-aware completions for globals, methods, and Perchance property keys.
- Added hover docs for common symbols and plugin-oriented keys.
- Added document symbols (Outline), go-to-definition, and find-references.
- Added import diagnostics for unresolved/duplicate imports with quick fixes.
- Added snippet pack with 16 common Perchance authoring templates.
- Added test fixtures and baseline grammar snapshot checks.
- Added CI workflow for JSON validation, snapshot regression checks, and VSIX packaging.

## 0.6.0

- Expanded colorful token scopes across Perchance list logic, import blocks, shorthand odds/ranges, and nested expressions.
- Improved hybrid language handling for embedded JavaScript, HTML, CSS inline styles, and template string interpolation.
- Added richer coverage for Perchance-specific properties and methods used by t2i framework/styles generators.
- Added more explicit operator/keyword/class scopes for modern JS syntax inside Perchance files.

## 0.5.0

- Added as many colorful syntaxes as practical for Perchance lists, methods, shorthand odds, hierarchy, and mixed JS/app bodies.
- Added dedicated scopes for Perchance list methods, hierarchical references, shorthand operators, and more HTML/CSS detail.
- Extended browser, storage, UI, and callback tokenization for a broader theme surface.

## 0.4.0

- Added many more granular scopes for richer, more colorful editor themes.
