**Curated Improvements For Perchance Language (Mosberg)**

Below is a prioritized, practical list focused on impact for real Perchance authoring.

1. Add real diagnostics (parser-based, not regex-only)

- Detect unclosed brackets, malformed list items, broken import blocks, invalid weights, and indentation structure issues.
- Biggest quality jump because users get immediate error feedback, not just colors.

2. Add autocomplete for Perchance-specific symbols

- Suggest common globals, list methods, property keys, and popular plugin keys.
- Include context-aware completions: inside square expressions, property lines, and list headers.

3. Add hover documentation

- Show concise docs for methods like selectOne/selectUnique/joinItems and globals like input/settings/window.
- Include examples and return behavior in hover text.

4. Add go-to-definition and find-references for list names

- Jump from references in expressions to list declarations.
- Huge usability win for large generators and style packs.

5. Add validation for import mechanics

- Check unresolved imports, duplicate imports, and likely typo cases in imported module names.
- Show warnings with quick fixes.

6. Add configurable lint profiles

- Settings for strict, balanced, and permissive validation modes.
- Lets beginners get guardrails while advanced users avoid noisy warnings.

7. Add Perchance-aware formatting commands

- Normalize indentation, align key-value patterns, and optionally standardize spacing around weights/ranges.
- Even partial formatter support will save a lot of manual cleanup.

8. Expand grammar with safer embedded-language boundaries

- Improve JS/HTML/CSS embedding boundaries to reduce false coloring spillover.
- Add targeted test cases for nested templates, inline style, and script-like blocks.

9. Add snippets for common patterns

- Snippets for generator scaffold, list blocks, weighted entries, import blocks, prompt/negative pairs, and callback bodies.
- Great productivity gain for repetitive authoring.

10. Add quick fixes and code actions

- Convert common mistakes automatically: missing separators, malformed namespace keys, bad weight syntax, unresolved list names.
- Keep fixes opt-in and explain each transformation.

11. Add symbol outline and document navigation support

- Show lists, functions, major properties, and imported sections in outline.
- Makes long Perchance files easier to navigate and review.

12. Add strong grammar regression tests and CI checks

- Snapshot tests for token scopes against real project examples.
- CI should fail on scope regressions, invalid grammar JSON, and packaging issues.

13. Add semantic token layer (optional advanced mode)

- Keep TextMate for base highlighting, then add semantic tokens for smarter distinctions (list declaration vs list reference, method vs property, import target vs plain text).
- Delivers cleaner theme behavior across different VS Code themes.

14. Add project-level config support

- Introduce extension settings for:
- strictness
- preferred indentation style
- highlight intensity mode
- plugin-aware validation packs
- Lets teams standardize behavior across repos.

15. Add plugin-aware schema packs

- Provide optional known-key dictionaries for common plugins (t2i framework/styles etc.).
- Warn on unknown keys while allowing custom keys in non-strict mode.

16. Add static analysis mechanics for large generators

- Detect unused lists, unreachable branches, cyclic references, and suspicious heavy expressions.
- Helps optimize maintainability and generation quality.

17. Add method-chain intelligence

- Validate and highlight method chaining on list references more accurately.
- Catch likely invalid chain combinations and typo methods.

18. Add release automation improvements

- Auto-generate changelog sections from tagged commits, auto-package VSIX, and run grammar tests before release.
- Lowers release risk and manual effort.

19. Add user-facing examples as test fixtures

- Maintain a curated gallery of real-world patterns and edge cases.
- Use them both for docs and automated regression verification.

20. Add in-editor migration helpers

- Commands to modernize older Perchance syntax patterns to current style conventions.
- Useful for users upgrading old generators/plugins.

**Recommended Build Order (fastest value)**

1. Diagnostics + autocomplete + hover
2. Go-to-definition + import validation + snippets
3. Formatter commands + quick fixes + outline symbols
4. CI regression suite + semantic tokens + plugin schema packs

## Concrete Milestone Roadmap (0.6.1 -> 0.8.0)

This roadmap is structured for steady delivery: fast UX wins first, then editor intelligence, then advanced semantic and analysis features.

### v0.6.1 - Foundation: Quality and Fast Authoring Wins

**Primary goal:** deliver immediate day-to-day productivity improvements with low risk.

**In scope**

- Add snippet pack for common Perchance patterns:
- generator scaffold
- list definition and weighted list item
- import block
- prompt/negative pair
- callback body (onStart/onChunk/onFinish/render)
- Expand grammar edge-case coverage for mixed JS/HTML/CSS boundaries and template interpolation.
- Add test fixtures from real project examples and baseline grammar snapshot tests.
- Introduce CI checks for JSON validity, grammar regression snapshots, and VSIX packaging.

**Out of scope**

- Diagnostics engine, definitions/references, formatter, semantic tokens.

**Exit criteria**

- At least 15 production-ready snippets with tabstops and placeholders.
- No failing grammar snapshots on known examples.
- CI fails on invalid grammar/config/package or regression in token snapshots.

### v0.6.2 - IntelliSense Phase 1: Completions and Hover Docs

**Primary goal:** make authoring faster and safer with contextual suggestions and inline docs.

**In scope**

- Add completion provider for:
- globals (input, settings, window, page)
- common list methods (selectOne, selectUnique, joinItems, evaluateItem, etc.)
- common property keys used in t2i-style generators/plugins
- Add context-aware completion behavior for:
- square expressions
- assignment/property lines
- list-item context
- Add hover provider docs for methods/globals/properties with mini examples.
- Add extension settings toggle to enable/disable completion groups.

**Out of scope**

- diagnostics parser, definition/reference graph, formatter.

**Exit criteria**

- Completion latency stays under 50 ms on typical files.
- Hover docs exist for top 30 symbols used in your generators/plugins.
- No duplicate completion spam in mixed-language lines.

### v0.6.3 - Navigation + Import Validation

**Primary goal:** improve codebase navigation and prevent import mistakes.

**In scope**

- Implement document symbol provider (Outline): lists, functions, key property blocks, imports.
- Implement go-to-definition and find-references for list declarations and imported aliases.
- Add import validations:
- unresolved module target
- duplicate imports in same scope
- likely typo suggestions based on known module names
- Add first quick fixes for import-related diagnostics.

**Out of scope**

- full parser diagnostics, formatting engine.

**Exit criteria**

- Definitions/references resolve correctly in nested list-heavy files.
- Import diagnostics provide actionable messages and at least one quick fix where possible.
- Outline remains stable and useful on files larger than 2,000 lines.

### v0.7.0 - Diagnostics Engine + Lint Profiles (Major)

**Primary goal:** launch parser-backed validation for real-time correctness feedback.

**In scope**

- Add parser-backed diagnostics for:
- unclosed brackets/braces
- malformed list items and malformed property namespaces
- invalid weight/probability forms
- indentation structure anomalies
- unsupported method-chain patterns (basic detection)
- Add lint profiles via settings:
- strict
- balanced (default)
- permissive
- Add diagnostic severities and per-rule toggles.
- Add quick fixes for high-confidence issues:
- bracket closure
- namespace separator normalization
- simple weight syntax normalization

**Out of scope**

- formatter, semantic tokens, static analysis graph.

**Exit criteria**

- New diagnostics are parser-backed, not regex-only.
- False-positive rate stays below 5% on curated fixture corpus.
- All diagnostics include source range, rule id, and user-readable fix guidance.

### v0.7.1 - Formatter + Structured Code Actions

**Primary goal:** make style consistency and cleanup one-click operations.

**In scope**

- Add Perchance-aware formatting command:
- normalize indentation
- normalize spacing around assignments and separators
- optional normalization of weight/range formatting
- Add code actions for:
- convert malformed meta keys
- normalize known property key variants
- remove duplicate import entries
- Add settings for formatting mode:
- preserve-author-style
- standardize-style

**Out of scope**

- semantic tokens and advanced static analysis.

**Exit criteria**

- Formatter is idempotent on repeated runs.
- Formatting does not alter semantic meaning on fixture tests.
- Code actions are previewable and safe by default.

### v0.7.2 - Plugin Schema Packs + Project Configuration

**Primary goal:** tailor validation/completion to real plugin ecosystems.

**In scope**

- Add plugin-aware schema packs for common modules (t2i framework/styles and extensible pack model).
- Add workspace-level config support for:
- active schema pack(s)
- lint profile default
- formatting mode default
- Add schema-aware completion and warnings for unknown keys.
- Add migration command to apply schema-aware key normalization in older files.

**Out of scope**

- semantic token engine and deep dependency graph analysis.

**Exit criteria**

- Users can switch schema packs without restart.
- Unknown-key warnings are suppressible and profile-aware.
- Pack definitions are versioned and documented.

### v0.8.0 - Semantic Intelligence + Static Analysis (Major)

**Primary goal:** deliver advanced correctness and maintainability tooling for large projects.

**In scope**

- Add semantic token provider layered on top of TextMate for precise symbol-role coloring:
- declaration vs reference
- method vs property
- import target vs plain string content
- Add static analysis mechanics:
- unused list detection
- unreachable branch detection
- cyclic list/reference detection
- suspicious heavy-expression warnings
- Add method-chain intelligence with rule-based validation and typo detection.
- Add migration helpers for legacy patterns to modern Perchance style.

**Out of scope**

- full language server protocol split (can be evaluated after 0.8.0).

**Exit criteria**

- Semantic token layer degrades gracefully when disabled.
- Static analysis can run on large files without editor lockups.
- High-value findings include clear rationale and optional quick actions.

## Release Gates (Apply To Every Version)

- All fixture tests pass (grammar + diagnostics + formatter where applicable).
- VSIX packaging succeeds in CI.
- CHANGELOG and README are updated with user-facing examples.
- Performance check passes for large example files.
- No critical regression in highlighting fidelity on existing generator/plugin files.

## Suggested Delivery Cadence

- 0.6.1, 0.6.2, 0.6.3: weekly or biweekly.
- 0.7.0: 2-4 week hardening window with dedicated fixture expansion.
- 0.7.1 and 0.7.2: biweekly.
- 0.8.0: 4-6 week development and stabilization cycle.
