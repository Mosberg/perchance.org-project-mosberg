const vscode = require("vscode");
const path = require("path");

const GLOBALS = ["input", "settings", "window", "page"];
const METHODS = [
  "selectOne",
  "selectMany",
  "selectUnique",
  "evaluateItem",
  "joinItems",
  "getLengthItems",
  "getParent",
  "getName",
  "randomize",
  "shuffle",
  "map",
  "filter",
  "reduce",
  "splitItems",
  "repeat",
  "contains",
  "startsWith",
  "endsWith",
  "replaceItems",
  "sortItems",
  "joinWith",
  "toUpperCase",
  "toLowerCase",
  "trim",
  "slice",
  "substring",
];
const PROPERTY_KEYS = [
  "prompt",
  "negative",
  "negativePrompt",
  "modifiers",
  "title",
  "description",
  "placeholder",
  "visible",
  "example",
  "label",
  "tooltip",
  "remember",
  "type",
  "default",
  "options",
  "instruction",
  "onChunk",
  "onStart",
  "onFinish",
  "render",
  "startWith",
  "outputTo",
  "saveTitle",
  "resolution",
  "userInputs",
  "numImages",
  "from",
  "examples",
  "random",
];

const HOVER_DOCS = {
  input:
    "Global input object exposed to expressions, e.g. `[input.description]`.",
  settings: "Global settings object for runtime/config values.",
  window: "Browser `window` object when hybrid JS/HTML is used.",
  page: "Perchance page-scope object for page-oriented state.",
  selectOne:
    "Pick one random item from a list. Example: `[animals.selectOne]`.",
  selectUnique:
    "Pick unique items from a list. Example: `[animals.selectUnique(2)]`.",
  joinItems:
    "Join list items into a string. Example: `[list.joinItems(', ')]`.",
  evaluateItem: "Evaluate a selected list item expression.",
  prompt: "Prompt text used for generation.",
  negative: "Negative prompt text used to steer generation away from traits.",
  modifiers: "Extra stylistic controls applied to prompt behavior.",
  onStart: "Callback body run before generation starts.",
  onChunk: "Callback body run per streamed chunk.",
  onFinish: "Callback body run when generation finishes.",
  render: "Render callback used by UI-oriented generators.",
};

function getHoverDoc(word) {
  if (HOVER_DOCS[word]) {
    return HOVER_DOCS[word];
  }

  if (METHODS.includes(word)) {
    return `Perchance list method '${word}'. Use inside square expressions such as [list.${word}(...)].`;
  }

  if (PROPERTY_KEYS.includes(word)) {
    return `Perchance property key '${word}' used in list items, settings blocks, and generator configs.`;
  }

  if (GLOBALS.includes(word)) {
    return `Perchance global '${word}' available in expressions and callback bodies.`;
  }

  return null;
}

const IMPORT_UNRESOLVED = "import-unresolved";
const IMPORT_DUPLICATE = "import-duplicate";

let diagnostics;
let knownModules = new Set();

function activate(context) {
  diagnostics = vscode.languages.createDiagnosticCollection("perchance");
  context.subscriptions.push(diagnostics);

  refreshKnownModules();

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: "perchance" },
      {
        provideCompletionItems(document, position) {
          const cfg = vscode.workspace.getConfiguration("perchance");
          const enableGlobals = cfg.get("completions.enableGlobals", true);
          const enableMethods = cfg.get("completions.enableMethods", true);
          const enableProperties = cfg.get(
            "completions.enableProperties",
            true,
          );

          const linePrefix = document
            .lineAt(position.line)
            .text.substring(0, position.character);
          const textBefore = document.getText(
            new vscode.Range(new vscode.Position(0, 0), position),
          );

          const isSquareContext = isInsideSquareExpression(textBefore);
          const isAssignmentContext =
            /(^|\s)[A-Za-z_][\w-]*\s*=\s*[^\n]*$/.test(linePrefix);
          const isPropertyContext =
            /^\s+[A-Za-z_][\w-]*(?::[A-Za-z_][\w-]*)?\s*=?\s*[^\n]*$/.test(
              linePrefix,
            );
          const isListItemContext = /^\s+\S/.test(linePrefix);

          const items = [];

          if (
            (isSquareContext || isAssignmentContext || isPropertyContext) &&
            enableGlobals
          ) {
            for (const globalName of GLOBALS) {
              const i = new vscode.CompletionItem(
                globalName,
                vscode.CompletionItemKind.Variable,
              );
              i.detail = "Perchance global";
              items.push(i);
            }
          }

          if ((isSquareContext || isListItemContext) && enableMethods) {
            for (const method of METHODS) {
              const i = new vscode.CompletionItem(
                method,
                vscode.CompletionItemKind.Method,
              );
              i.insertText = new vscode.SnippetString(`${method}($1)`);
              i.detail = "Perchance list method";
              items.push(i);
            }
          }

          if (
            (isAssignmentContext || isPropertyContext || isListItemContext) &&
            enableProperties
          ) {
            for (const key of PROPERTY_KEYS) {
              const i = new vscode.CompletionItem(
                key,
                vscode.CompletionItemKind.Property,
              );
              i.insertText = new vscode.SnippetString(`${key} = $1`);
              i.detail = "Perchance property key";
              items.push(i);
            }
          }

          return dedupeCompletionItems(items);
        },
      },
      ".",
      "[",
      ":",
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { language: "perchance" },
      {
        provideHover(document, position) {
          const cfg = vscode.workspace.getConfiguration("perchance");
          if (!cfg.get("hover.enableDocs", true)) {
            return null;
          }

          const wordRange = document.getWordRangeAtPosition(
            position,
            /[A-Za-z_][\w$]*/,
          );
          if (!wordRange) {
            return null;
          }
          const word = document.getText(wordRange);
          const doc = getHoverDoc(word);
          if (!doc) {
            return null;
          }

          return new vscode.Hover(
            new vscode.MarkdownString(`**${word}**\n\n${doc}`),
            wordRange,
          );
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(
      { language: "perchance" },
      {
        provideDocumentSymbols(document) {
          return buildDocumentSymbols(document);
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      { language: "perchance" },
      {
        provideDefinition(document, position) {
          const wordRange = document.getWordRangeAtPosition(
            position,
            /[A-Za-z_][\w.-]*/,
          );
          if (!wordRange) {
            return null;
          }
          const word = document.getText(wordRange);
          const index = buildIndex(document);
          const targetRange = index.declarations.get(word);
          if (!targetRange) {
            return null;
          }

          return new vscode.Location(document.uri, targetRange);
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerReferenceProvider(
      { language: "perchance" },
      {
        provideReferences(document, position) {
          const wordRange = document.getWordRangeAtPosition(
            position,
            /[A-Za-z_][\w.-]*/,
          );
          if (!wordRange) {
            return [];
          }
          const word = document.getText(wordRange);
          return findWordReferences(document, word);
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { language: "perchance" },
      new PerchanceImportCodeActionProvider(),
      { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] },
    ),
  );

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((doc) => {
      if (doc.languageId === "perchance") {
        updateDiagnostics(doc);
      }
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document.languageId === "perchance") {
        updateDiagnostics(event.document);
      }
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      if (doc.languageId === "perchance") {
        refreshKnownModules().then(() => updateDiagnostics(doc));
      }
    }),
  );

  for (const editor of vscode.window.visibleTextEditors) {
    if (editor.document.languageId === "perchance") {
      updateDiagnostics(editor.document);
    }
  }
}

function deactivate() {
  if (diagnostics) {
    diagnostics.dispose();
  }
}

async function refreshKnownModules() {
  const uris = await vscode.workspace.findFiles(
    "**/*.perchance",
    "**/{node_modules,.git}/**",
  );
  const modules = new Set();
  for (const uri of uris) {
    const base = path.basename(uri.fsPath, ".perchance");
    if (base) {
      modules.add(base);
    }
  }
  knownModules = modules;
}

function updateDiagnostics(document) {
  const diags = [];
  const imports = [];
  const seenByModule = new Map();

  for (let line = 0; line < document.lineCount; line += 1) {
    const text = document.lineAt(line).text;
    const importRe = /\{\s*import\s*:\s*([^}\s,]+)\s*\}/g;
    let m;

    while ((m = importRe.exec(text)) !== null) {
      const moduleName = m[1];
      const start = m.index + m[0].indexOf(moduleName);
      const end = start + moduleName.length;
      const range = new vscode.Range(line, start, line, end);
      imports.push({ moduleName, range, line, raw: m[0] });

      if (!knownModules.has(moduleName)) {
        const d = new vscode.Diagnostic(
          range,
          `Unresolved import module '${moduleName}'.`,
          vscode.DiagnosticSeverity.Warning,
        );
        d.code = IMPORT_UNRESOLVED;
        d.source = "perchance";
        d.relatedInformation = [];
        diags.push(d);
      }

      if (!seenByModule.has(moduleName)) {
        seenByModule.set(moduleName, []);
      }
      seenByModule.get(moduleName).push(range);
    }
  }

  for (const [moduleName, ranges] of seenByModule.entries()) {
    if (ranges.length > 1) {
      for (let i = 1; i < ranges.length; i += 1) {
        const d = new vscode.Diagnostic(
          ranges[i],
          `Duplicate import for '${moduleName}' in this document.`,
          vscode.DiagnosticSeverity.Information,
        );
        d.code = IMPORT_DUPLICATE;
        d.source = "perchance";
        diags.push(d);
      }
    }
  }

  diagnostics.set(document.uri, diags);
}

class PerchanceImportCodeActionProvider {
  provideCodeActions(document, _range, context) {
    const actions = [];

    for (const diag of context.diagnostics) {
      if (diag.code === IMPORT_DUPLICATE) {
        const action = new vscode.CodeAction(
          "Remove duplicate import",
          vscode.CodeActionKind.QuickFix,
        );
        action.diagnostics = [diag];
        action.edit = new vscode.WorkspaceEdit();
        const fullLine = document.lineAt(
          diag.range.start.line,
        ).rangeIncludingLineBreak;
        action.edit.delete(document.uri, fullLine);
        actions.push(action);
      }

      if (diag.code === IMPORT_UNRESOLVED) {
        const unresolved = document.getText(diag.range);
        const suggestion = closestModuleName(unresolved, [...knownModules]);
        if (suggestion) {
          const action = new vscode.CodeAction(
            `Change import to '${suggestion}'`,
            vscode.CodeActionKind.QuickFix,
          );
          action.diagnostics = [diag];
          action.edit = new vscode.WorkspaceEdit();
          action.edit.replace(document.uri, diag.range, suggestion);
          actions.push(action);
        }
      }
    }

    return actions;
  }
}

function isInsideSquareExpression(text) {
  let balance = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "[") {
      balance += 1;
    } else if (text[i] === "]" && balance > 0) {
      balance -= 1;
    }
  }
  return balance > 0;
}

function buildIndex(document) {
  const declarations = new Map();

  for (let line = 0; line < document.lineCount; line += 1) {
    const text = document.lineAt(line).text;

    let m = text.match(
      /^(?!\s|#|\/\/|<|\$)([A-Za-z_][\w.-]*)(\s*)(?=$|\[|\{|<)/,
    );
    if (m) {
      const start = text.indexOf(m[1]);
      declarations.set(
        m[1],
        new vscode.Range(line, start, line, start + m[1].length),
      );
    }

    m = text.match(/^\s*(?:async\s+)?(\$?[A-Za-z_][\w$]*)\s*\([^\n]*\)\s*=>/);
    if (m) {
      const start = text.indexOf(m[1]);
      declarations.set(
        m[1],
        new vscode.Range(line, start, line, start + m[1].length),
      );
    }

    m = text.match(/^(?!\s|#|\/\/|<)([A-Za-z_$][\w.$-]*)(\s*)=(?!=)/);
    if (m) {
      const start = text.indexOf(m[1]);
      declarations.set(
        m[1],
        new vscode.Range(line, start, line, start + m[1].length),
      );
    }
  }

  return { declarations };
}

function buildDocumentSymbols(document) {
  const symbols = [];

  for (let line = 0; line < document.lineCount; line += 1) {
    const text = document.lineAt(line).text;

    let m = text.match(
      /^(?!\s|#|\/\/|<|\$)([A-Za-z_][\w.-]*)(\s*)(?=$|\[|\{|<)/,
    );
    if (m) {
      const start = text.indexOf(m[1]);
      const range = new vscode.Range(line, start, line, start + m[1].length);
      symbols.push(
        new vscode.DocumentSymbol(
          m[1],
          "list",
          vscode.SymbolKind.Array,
          range,
          range,
        ),
      );
      continue;
    }

    m = text.match(/^\s*(?:async\s+)?(\$?[A-Za-z_][\w$]*)\s*\([^\n]*\)\s*=>/);
    if (m) {
      const start = text.indexOf(m[1]);
      const range = new vscode.Range(line, start, line, start + m[1].length);
      symbols.push(
        new vscode.DocumentSymbol(
          m[1],
          "function",
          vscode.SymbolKind.Function,
          range,
          range,
        ),
      );
      continue;
    }

    m = text.match(/^(?!\s|#|\/\/|<)([A-Za-z_$][\w.$-]*)(\s*)=(?!=)/);
    if (m) {
      const start = text.indexOf(m[1]);
      const range = new vscode.Range(line, start, line, start + m[1].length);
      symbols.push(
        new vscode.DocumentSymbol(
          m[1],
          "assignment",
          vscode.SymbolKind.Variable,
          range,
          range,
        ),
      );
      continue;
    }

    m = text.match(/\{\s*import\s*:\s*([^}\s,]+)\s*\}/);
    if (m) {
      const start = text.indexOf(m[1]);
      const range = new vscode.Range(line, start, line, start + m[1].length);
      symbols.push(
        new vscode.DocumentSymbol(
          `import:${m[1]}`,
          "import",
          vscode.SymbolKind.Module,
          range,
          range,
        ),
      );
    }
  }

  return symbols;
}

function findWordReferences(document, word) {
  const refs = [];
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "g");

  for (let line = 0; line < document.lineCount; line += 1) {
    const text = document.lineAt(line).text;
    let m;
    while ((m = re.exec(text)) !== null) {
      refs.push(
        new vscode.Location(
          document.uri,
          new vscode.Range(line, m.index, line, m.index + word.length),
        ),
      );
    }
  }

  return refs;
}

function closestModuleName(name, candidates) {
  if (!candidates.length) {
    return null;
  }

  let best = null;
  let bestScore = Number.MAX_SAFE_INTEGER;

  for (const candidate of candidates) {
    const score = levenshteinDistance(name, candidate);
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return bestScore <= 4 ? best : null;
}

function levenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i += 1) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[a.length][b.length];
}

function dedupeCompletionItems(items) {
  const seen = new Set();
  const out = [];

  for (const item of items) {
    const key = `${item.label}|${item.kind}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }

  return out;
}

module.exports = {
  activate,
  deactivate,
};
