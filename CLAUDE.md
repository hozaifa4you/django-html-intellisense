# Django HTML IntelliSense

A VS Code extension that turns on VS Code's built-in HTML language features (tag, attribute and value completions, hover docs, auto-close, auto quotes) and Emmet in `django-html` templates, without changing the file's language. It is published to the Marketplace as `hozaifabinmasud.django-html-intellisense`.

## Commands

- `npm test`: syntax-checks `extension.js`, then runs `test/*.test.js` with Node's built-in runner. Run it after every change.
- `node --test test/autoCloseTag.test.js`: runs one test file.
- `npm run package`: builds the `.vsix` with `vsce`, as CI does. The output is git-ignored.
- `npx vsce ls`: lists the files that will ship in the `.vsix`. Run it after adding, moving or renaming files.
- `npm run publish`: publishes to the Marketplace. Never run it, or `vsce publish`, unless the user asks.

There is no build step, bundler, linter or TypeScript. The files in the repo are what ships.

## How it works

- Most of the behaviour is declarative, in `package.json` under `contributes`:
  - `htmlLanguageParticipants` registers `django-html` with the built-in HTML language server. `autoInsert: true` turns on auto-close and auto quotes.
  - `configurationDefaults` turns on Emmet and in-attribute suggestions for `[django-html]`. These are defaults, so users' own settings always win.
- `extension.js` activates on `onLanguage:django-html`. It activates `vscode.html-language-features`, which otherwise starts only for `html` and `handlebars` files. It also warns when the Auto Close Tag extension would insert every closing tag a second time.
- `lib/` holds pure logic with no `vscode` import, so plain Node can test it.

## Conventions

- Use CommonJS (`require` and `module.exports`). CI runs Node 20.
- Don't add runtime dependencies. `@vscode/vsce` is the only dev dependency.
- `require("vscode")` works only inside the extension host, so tests can't load `extension.js`. Put logic worth testing in `lib/` and test it in `test/*.test.js` with `node:test` and `node:assert/strict`.
- `engines.vscode` is `^1.90.0`, so don't use VS Code APIs added after 1.90.
- Match the existing style: 2-space indent, double quotes, semicolons, trailing commas.
- Write test names, `README.md` and `CHANGELOG.md` entries as plain descriptions of what the user sees.

## Packaging and release

- `.vscodeignore` controls what ships in the `.vsix`. Add any new dev-only file to it, and check with `npx vsce ls`.
- The Marketplace icon (`assets/logo.png`) must be a PNG, and `vsce` rejects SVG images in `README.md`.
- To release:
  1. Bump `version` in `package.json`.
  2. Add a section at the top of `CHANGELOG.md`.
  3. Update `README.md` if the features changed.
  4. Run `npm test` and `npm run package`.

## Manual testing

The extension can only be checked by hand. Ask the user to press F5. This runs "Run Extension" in `.vscode/launch.json` and opens an Extension Development Host. That window needs an extension that provides the `django-html` language, such as `batisteo.vscode-django`. Without one, templates open as plain HTML and this extension never activates.

## Environment

Development happens on Windows with `core.autocrlf=true`. Keep the `package.json` scripts cross-platform, with no shell-specific syntax.
