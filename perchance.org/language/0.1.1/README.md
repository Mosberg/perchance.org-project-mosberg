# Perchance Language (Mosberg)

VS Code syntax highlighting for advanced **Perchance** files, especially app-style generators, plugins, and deeply nested list/config structures.

This package is based on a TextMate grammar tuned against real-world Perchance projects with patterns such as:
- plugin imports like `{import:ai-text-plugin}`
- function definitions like `$output(settings) =>`
- async app logic like `async generate() =>`
- nested settings lists and callback properties
- prompt prose mixed with `[expressions]` and trailing `^weights`
- embedded HTML and `<script>` blocks
- member chains like `input.description`, `settings.model.temperature`, and `window.chatState.ready`

## Included files

- `package.json`
- `language-configuration.json`
- `syntaxes/perchance.tmLanguage.json`

## Supported scopes

### Core scopes

- `source.perchance`
- `meta.list.definition.perchance`
- `meta.list.item.perchance`
- `meta.assignment.perchance`
- `meta.function.definition.perchance`
- `meta.property.line.perchance`
- `meta.property.line.simple.perchance`

### Expression scopes

- `meta.embedded.square.perchance`
- `meta.embedded.curly.perchance`
- `entity.name.function.perchance`
- `keyword.operator.assignment.perchance`
- `keyword.operator.probability.perchance`
- `keyword.control.conditional.perchance`

### Repo-tuned scopes

- `support.type.property.namespace.perchance`
- `support.type.property.name.perchance`
- `variable.language.input.perchance`
- `variable.language.settings.perchance`
- `variable.language.window.perchance`
- `variable.other.memberchain.input.perchance`
- `variable.other.memberchain.settings.perchance`
- `variable.other.memberchain.window.perchance`
- `meta.prompt.prose.perchance`
- `meta.prompt.weight.perchance`
- `support.variable.state.perchance`
- `support.function.ai.perchance`

### HTML scopes

- `meta.tag.any.html.perchance`
- `meta.tag.script.begin.html.perchance`
- `meta.tag.script.end.html.perchance`
- `entity.name.tag.html`
- `entity.other.attribute-name.html`

## Scope examples

### Imports

```perchance
ai = {import:ai-text-plugin}
```

Expected highlighting:
- `ai` -> `variable.other.assignment.perchance`
- `=` -> `keyword.operator.assignment.perchance`
- `import` -> `support.function.import.perchance`
- `ai-text-plugin` -> `entity.name.module.perchance`

### Function definition

```perchance
$output(settings) =>
```

Expected highlighting:
- `$output` -> `entity.name.function.perchance`
- `settings` -> `variable.parameter.perchance`
- `=>` -> `storage.type.function.arrow.perchance`

### Namespaced property

```perchance
meta:tags = [({chat:100, rewrite:70})]
```

Expected highlighting:
- `meta` -> `support.type.property.namespace.perchance`
- `:` -> `punctuation.separator.key-value.perchance`
- `tags` -> `support.type.property.name.perchance`

### Member chains

```perchance
[input.description]
[settings.model.temperature]
[window.chatState.ready]
```

Expected highlighting:
- `input.description` -> `variable.other.memberchain.input.perchance`
- `settings.model.temperature` -> `variable.other.memberchain.settings.perchance`
- `window.chatState.ready` -> `variable.other.memberchain.window.perchance`

### Prompt prose with weight

```perchance
prompt = Rewrite [input.userMessage] in [rewriteStyle] style. ^1.5
```

Expected highlighting:
- prose text -> `meta.prompt.prose.perchance`
- embedded `[ ... ]` -> `meta.embedded.square.perchance`
- `^` -> `keyword.operator.probability.perchance`
- `1.5` -> `constant.numeric.perchance`

## Installation for development

1. Open this folder in VS Code.
2. Run `npm install -g @vscode/vsce` if you want to package it.
3. Press `F5` to launch an Extension Development Host.
4. Open a `.perchance` file in the new window.

## Packaging

```bash
vsce package
```

That will create a `.vsix` you can install locally in VS Code.
