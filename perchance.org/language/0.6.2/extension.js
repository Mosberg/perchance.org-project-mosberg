const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

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

const IMPORT_UNRESOLVED = "import-unresolved";
const IMPORT_DUPLICATE = "import-duplicate";

let diagnostics;
let knownModules = new Set();
let importCandidates = new Set();
let officialPluginByModule = new Map();
let workspacePluginByModule = new Map();
let officialTemplateEntries = [];
let customTemplateEntries = [];

function activate(context) {
  diagnostics = vscode.languages.createDiagnosticCollection("perchance");
  context.subscriptions.push(diagnostics);

  loadReferenceData(context);

  refreshKnownModules();
  refreshWorkspaceCustomPlugins();

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
          const enableOfficialPlugins = cfg.get(
            "completions.enableOfficialPlugins",
            true,
          );
          const enableCustomPlugins = cfg.get(
            "completions.enableCustomPlugins",
            true,
          );
          const enableTemplateLinks = cfg.get(
            "completions.enableTemplateLinks",
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
          const isImportContext = /\{\s*import\s*:\s*[^}\s,]*$/.test(
            linePrefix,
          );
          const isTemplateUrlContext =
            /https?:\/\/perchance\.org\/[A-Za-z0-9-]*$/.test(linePrefix) ||
            /(?:template|url|link)\s*=\s*[^\n]*$/.test(linePrefix);

          const items = [];

          if (
            (isSquareContext || isAssignmentContext || isPropertyContext) &&
            enableGlobals
          ) {
            for (const globalName of GLOBALS) {
              const item = new vscode.CompletionItem(
                globalName,
                vscode.CompletionItemKind.Variable,
              );
              item.detail = "Perchance global";
              items.push(item);
            }
          }

          if ((isSquareContext || isListItemContext) && enableMethods) {
            for (const method of METHODS) {
              const item = new vscode.CompletionItem(
                method,
                vscode.CompletionItemKind.Method,
              );
              item.insertText = new vscode.SnippetString(`${method}($1)`);
              item.detail = "Perchance list method";
              items.push(item);
            }
          }

          if (
            (isAssignmentContext || isPropertyContext || isListItemContext) &&
            enableProperties
          ) {
            for (const key of PROPERTY_KEYS) {
              const item = new vscode.CompletionItem(
                key,
                vscode.CompletionItemKind.Property,
              );
              item.insertText = new vscode.SnippetString(`${key} = $1`);
              item.detail = "Perchance property key";
              items.push(item);
            }
          }

          if (isImportContext && enableOfficialPlugins) {
            for (const [
              moduleName,
              plugin,
            ] of officialPluginByModule.entries()) {
              const item = new vscode.CompletionItem(
                moduleName,
                vscode.CompletionItemKind.Module,
              );
              item.detail = plugin.label;
              item.documentation = plugin.description;
              item.sortText = `a-${moduleName}`;
              items.push(item);
            }
          }

          if (isImportContext && enableCustomPlugins) {
            for (const [
              moduleName,
              plugin,
            ] of workspacePluginByModule.entries()) {
              const item = new vscode.CompletionItem(
                moduleName,
                vscode.CompletionItemKind.Module,
              );
              item.detail = `${plugin.label} (workspace custom plugin)`;
              item.documentation = plugin.description;
              item.sortText = `a0-${moduleName}`;
              items.push(item);
            }
          }

          if (isTemplateUrlContext && enableTemplateLinks) {
            for (const template of officialTemplateEntries) {
              const item = new vscode.CompletionItem(
                template.url,
                vscode.CompletionItemKind.Reference,
              );
              item.detail = template.label;
              item.documentation = template.description;
              item.sortText = `b-${template.label}`;
              items.push(item);
            }
          }

          return dedupeCompletionItems(items);
        },
      },
      ".",
      "[",
      ":",
      "-",
      "/",
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
            /[A-Za-z0-9_-]+/,
          );
          if (!wordRange) {
            return null;
          }

          const word = document.getText(wordRange);
          const md = getHoverMarkdown(word);
          if (!md) {
            return null;
          }

          return new vscode.Hover(md, wordRange);
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
    vscode.commands.registerCommand(
      "perchance.createWorkspacePluginsFile",
      async () => {
        const fileName = getCustomPluginsFileName();
        const uri = await ensureWorkspacePluginsFile(fileName);
        if (uri) {
          const doc = await vscode.workspace.openTextDocument(uri);
          await vscode.window.showTextDocument(doc);
        }
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "perchance.insertCustomTemplate",
      async () => {
        const cfg = vscode.workspace.getConfiguration("perchance");
        if (!cfg.get("commands.enableTemplateInsertion", true)) {
          vscode.window.showInformationMessage(
            "Template insertion is disabled by settings.",
          );
          return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }

        const pick = await vscode.window.showQuickPick(
          customTemplateEntries.map((t) => ({
            label: t.label,
            description: t.description,
            detail: t.id,
            template: t,
          })),
          {
            placeHolder: "Choose a custom Perchance template to insert",
            matchOnDescription: true,
            matchOnDetail: true,
          },
        );

        if (!pick) {
          return;
        }

        await editor.edit((editBuilder) => {
          editBuilder.replace(editor.selection, pick.template.content);
        });
      },
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "perchance.insertOfficialTemplateLink",
      async () => {
        const cfg = vscode.workspace.getConfiguration("perchance");
        if (!cfg.get("commands.enableTemplateInsertion", true)) {
          vscode.window.showInformationMessage(
            "Template insertion is disabled by settings.",
          );
          return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }

        const pick = await vscode.window.showQuickPick(
          officialTemplateEntries.map((t) => ({
            label: t.label,
            description: t.description,
            detail: t.url,
            template: t,
          })),
          {
            placeHolder: "Choose an official Perchance template link",
            matchOnDescription: true,
            matchOnDetail: true,
          },
        );

        if (!pick) {
          return;
        }

        await editor.edit((editBuilder) => {
          editBuilder.replace(editor.selection, pick.template.url);
        });
      },
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
        Promise.all([
          refreshKnownModules(),
          refreshWorkspaceCustomPlugins(),
        ]).then(() => updateDiagnostics(doc));
        return;
      }

      if (path.basename(doc.fileName) === getCustomPluginsFileName()) {
        refreshWorkspaceCustomPlugins().then(() => {
          for (const editor of vscode.window.visibleTextEditors) {
            if (editor.document.languageId === "perchance") {
              updateDiagnostics(editor.document);
            }
          }
        });
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

function loadReferenceData(context) {
  const dataDir = path.join(context.extensionPath, "data");

  const pluginsData = safeReadJson(
    path.join(dataDir, "official_plugins.json"),
    {
      plugins: [],
    },
  );
  const templatesData = safeReadJson(
    path.join(dataDir, "official_templates_generators.json"),
    { templates_generators: [] },
  );
  const customData = safeReadJson(path.join(dataDir, "custom_templates.json"), {
    templates: [],
  });

  officialPluginByModule = new Map();
  for (const plugin of pluginsData.plugins || []) {
    const moduleName = extractImportModule(plugin.snippet || "");
    if (!moduleName) {
      continue;
    }
    officialPluginByModule.set(moduleName, {
      moduleName,
      label: plugin.label || moduleName,
      description: plugin.description || "",
      url: plugin.url || "",
      urlEdit: plugin.url_edit || "",
      snippet: plugin.snippet || "",
    });
  }

  officialTemplateEntries = (templatesData.templates_generators || []).map(
    (t) => ({
      label: t.label || t.url || "Template",
      description: t.description || "",
      url: t.url || "",
      urlEdit: t.url_edit || "",
      snippet: t.snippet || "",
    }),
  );

  customTemplateEntries = (customData.templates || []).map((t) => ({
    id: t.id || t.label || "template",
    label: t.label || t.id || "Template",
    description: t.description || "",
    content: t.content || "",
  }));

  importCandidates = new Set([...officialPluginByModule.keys()]);
}

function getCustomPluginsFileName() {
  const cfg = vscode.workspace.getConfiguration("perchance");
  const fileName = cfg.get(
    "plugins.customPluginsFileName",
    "plugins.perchance.json",
  );
  return typeof fileName === "string" && fileName.trim()
    ? fileName.trim()
    : "plugins.perchance.json";
}

async function refreshWorkspaceCustomPlugins() {
  const fileName = getCustomPluginsFileName();
  const jsonFiles = await vscode.workspace.findFiles(
    `**/${fileName}`,
    "**/{node_modules,.git}/**",
  );

  const customMap = new Map();
  for (const uri of jsonFiles) {
    const data = safeReadJson(uri.fsPath, { custom_plugins: [] });
    const plugins = Array.isArray(data.custom_plugins)
      ? data.custom_plugins
      : [];

    for (const plugin of plugins) {
      const snippet =
        plugin && typeof plugin.snippet === "string" ? plugin.snippet : "";
      const moduleName = extractImportModule(snippet) || plugin.label;
      if (!moduleName || typeof moduleName !== "string") {
        continue;
      }

      customMap.set(moduleName, {
        moduleName,
        label: plugin.label || moduleName,
        description: plugin.description || "",
        url: plugin.url || "",
        urlEdit: plugin.url_edit || "",
        snippet,
      });
    }
  }

  workspacePluginByModule = customMap;
  importCandidates = new Set([
    ...knownModules,
    ...officialPluginByModule.keys(),
    ...workspacePluginByModule.keys(),
  ]);
}

async function ensureWorkspacePluginsFile(fileName) {
  const folders = vscode.workspace.workspaceFolders || [];
  if (!folders.length) {
    vscode.window.showWarningMessage(
      "Open a workspace folder first to create plugins.perchance.json.",
    );
    return null;
  }

  let targetFolder = folders[0];
  if (folders.length > 1) {
    const picked = await vscode.window.showQuickPick(
      folders.map((f) => ({ label: f.name, folder: f })),
      { placeHolder: "Choose workspace folder for custom plugins file" },
    );
    if (!picked) {
      return null;
    }
    targetFolder = picked.folder;
  }

  const targetUri = vscode.Uri.joinPath(targetFolder.uri, fileName);
  try {
    await vscode.workspace.fs.stat(targetUri);
    return targetUri;
  } catch {
    const template = {
      custom_plugins: [
        {
          label: "tabbed-comments-plugin-v1",
          description:
            "A plugin that adds tabbed comments to a webpage, allowing users to organize and view comments in different categories or sections.",
          url: "https://perchance.org/tabbed-comments-plugin-v1",
          url_edit: "https://perchance.org/tabbed-comments-plugin-v1#edit",
          snippet: "tabbedCommentsPlugin = {import:tabbed-comments-plugin-v1}",
        },
        {
          label: "create-media-gallery-plugin",
          description:
            "A plugin that allows users to create and manage media galleries, including images, videos, and other media types.",
          url: "https://perchance.org/create-media-gallery-plugin",
          url_edit: "https://perchance.org/create-media-gallery-plugin#edit",
          snippet:
            "createMediaGalleryPlugin = {import:create-media-gallery-plugin}",
        },
      ],
    };

    await vscode.workspace.fs.writeFile(
      targetUri,
      Buffer.from(`${JSON.stringify(template, null, 2)}\n`, "utf8"),
    );
    await refreshWorkspaceCustomPlugins();
    return targetUri;
  }
}

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function extractImportModule(snippet) {
  const m = snippet.match(/\{\s*import\s*:\s*([^}\s,]+)\s*\}/);
  return m ? m[1] : null;
}

function getHoverMarkdown(word) {
  const customPluginMeta = workspacePluginByModule.get(word);
  if (customPluginMeta) {
    const md = new vscode.MarkdownString(
      `**${customPluginMeta.label}**\n\n${customPluginMeta.description || "Workspace custom plugin"}${customPluginMeta.url ? `\n\n[Open plugin](${customPluginMeta.url})` : ""}`,
    );
    md.isTrusted = false;
    return md;
  }

  const pluginMeta = officialPluginByModule.get(word);
  if (pluginMeta) {
    const md = new vscode.MarkdownString(
      `**${pluginMeta.label}**\n\n${pluginMeta.description || "Official Perchance plugin"}\n\n[Open plugin](${pluginMeta.url})`,
    );
    md.isTrusted = false;
    return md;
  }

  if (HOVER_DOCS[word]) {
    return new vscode.MarkdownString(`**${word}**\n\n${HOVER_DOCS[word]}`);
  }

  if (METHODS.includes(word)) {
    return new vscode.MarkdownString(
      `**${word}**\n\nPerchance list method used inside square expressions such as [list.${word}(...)].`,
    );
  }

  if (PROPERTY_KEYS.includes(word)) {
    return new vscode.MarkdownString(
      `**${word}**\n\nPerchance property key used in list items, settings blocks, and generator configs.`,
    );
  }

  if (GLOBALS.includes(word)) {
    return new vscode.MarkdownString(
      `**${word}**\n\nPerchance global available in expressions and callback bodies.`,
    );
  }

  return null;
}

async function refreshKnownModules() {
  const uris = await vscode.workspace.findFiles(
    "**/*.perchance",
    "**/{node_modules,.git}/**",
  );
  const localModules = new Set();
  for (const uri of uris) {
    const base = path.basename(uri.fsPath, ".perchance");
    if (base) {
      localModules.add(base);
    }
  }

  knownModules = localModules;
  importCandidates = new Set([
    ...localModules,
    ...officialPluginByModule.keys(),
    ...workspacePluginByModule.keys(),
  ]);
}

function updateDiagnostics(document) {
  const diags = [];
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

      if (!importCandidates.has(moduleName)) {
        const diag = new vscode.Diagnostic(
          range,
          `Unresolved import module '${moduleName}'.`,
          vscode.DiagnosticSeverity.Warning,
        );
        diag.code = IMPORT_UNRESOLVED;
        diag.source = "perchance";
        diags.push(diag);
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
        const diag = new vscode.Diagnostic(
          ranges[i],
          `Duplicate import for '${moduleName}' in this document.`,
          vscode.DiagnosticSeverity.Information,
        );
        diag.code = IMPORT_DUPLICATE;
        diag.source = "perchance";
        diags.push(diag);
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
        const suggestion = closestModuleName(unresolved, [...importCandidates]);
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

  return bestScore <= 6 ? best : null;
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
