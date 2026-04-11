# Changelog

## 0.4.0

- Added many more granular scopes for richer, more colorful editor themes.
- Added dedicated scopes for DOM/browser globals, UI element identifiers, storage/helper variables, optional chaining, spread operators, regex literals, `this`, `arguments`, JSON-like keys, and inline CSS style attributes.
- Kept hybrid Perchance/JavaScript body support for arrow-function blocks and callback bodies.
- Expanded HTML-related highlighting to better distinguish inline style content.

## 0.3.0

- Added hybrid Perchance/JavaScript body handling for `async foo() =>` style blocks.
- Added hybrid handling for callback property bodies such as `instruction() =>`, `onChunk() =>`, `onStart() =>`, `onFinish() =>`, and `render() =>`.
- Added embedded JavaScript mapping for hybrid body scopes in addition to `<script>` blocks.
- Improved indentation behavior for JS-heavy arrow-function bodies.
