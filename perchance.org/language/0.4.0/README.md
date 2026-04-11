# Perchance Language (Mosberg)

Version **0.4.0** adds a much more **colorful** and theme-friendly syntax surface by introducing many extra scopes that editors and color themes can target independently.

## New in 0.4.0

This version adds more granular tokenization for:
- browser and DOM globals like `document`, `localStorage`, `navigator`, `console`, `JSON`, `Math`, `fetch`
- common UI element variables like `responseEl`, `generateBtn`, `loaderEl`
- helper/storage variables like `pendingObj`, `loadingModal`, `shareUrl`, `blob`
- optional chaining `?.`, spread `...`, arrow operators, and regex literals
- `this` and `arguments`
- JSON-like object keys inside embedded expressions
- inline CSS inside HTML `style="..."` attributes

## Why this is more colorful

Themes can now assign different colors to many more distinct semantic groups instead of collapsing them into generic variables or strings.

Examples of newly distinguishable groups:
- `support.class.dom.perchance`
- `support.type.dom-event.perchance`
- `support.constant.ui.perchance`
- `support.constant.storage.perchance`
- `keyword.operator.optional.perchance`
- `keyword.operator.spread.perchance`
- `string.regexp.perchance`
- `variable.language.this.perchance`
- `support.type.property.json.perchance`
- `support.type.property-name.css.perchance`
- `support.constant.color.css.perchance`

## Example

```perchance
async generate() =>
  let pendingObj = ai(settings);
  console.log(window.chatState?.ready);
  let regex = /chat|code|rewrite/g;
  return `<div style="color:red; margin:8px;">[input.userMessage]</div>`;
```

This now gives more visual separation across JS logic, object access, regex, HTML, inline CSS, and Perchance expressions.

## Included

- Hybrid Perchance/JavaScript grammar
- VS Code language configuration
- Example fixtures
- Icon, LICENSE, and CHANGELOG
