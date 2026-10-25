<p align="center">
  <img src="assets/logo.png" alt="Django HTML IntelliSense logo" width="50">
</p>

<h1 align="center">Django HTML IntelliSense</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=hozaifabinmasud.django-html-intellisense">
    <img src="https://img.shields.io/visual-studio-marketplace/v/hozaifabinmasud.django-html-intellisense?label=VS%20Code%20Marketplace" alt="VS Code Marketplace version">
  </a>
  <a href="https://github.com/hozaifa4you/django-html-intellisense/actions/workflows/ci.yml">
    <img src="https://github.com/hozaifa4you/django-html-intellisense/actions/workflows/ci.yml/badge.svg" alt="CI status">
  </a>
  <a href="https://github.com/hozaifa4you/django-html-intellisense/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/hozaifa4you/django-html-intellisense" alt="MIT License">
  </a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=hozaifabinmasud.django-html-intellisense">Install from Marketplace</a>
  ·
  <a href="https://github.com/hozaifa4you/django-html-intellisense">GitHub repository</a>
  ·
  <a href="https://github.com/hozaifa4you/django-html-intellisense/issues">Report an issue</a>
</p>

Get VS Code's full HTML IntelliSense in Django templates, and keep Django syntax highlighting.

Django extensions mark templates as `django-html`, so `{% %}` and `{{ }}` get their own colors. VS Code's built-in HTML features only run for files marked `html`, though. In a Django template you get no tag or attribute suggestions, no hover docs and no automatic closing tags.

This extension asks VS Code's built-in HTML language server to serve `django-html` files as well. Templates keep their `django-html` language, so highlighting, snippets and go-to-template keep working.

## Features

In any `django-html` file you get:

- **Tag suggestions.** Type `<` to get every HTML element.
- **Attribute suggestions.** In `<input ` you get `type`, `autocomplete`, `inputmode`, `aria-*`, `data-*` and the rest.
- **Attribute value suggestions.** `type="` offers `email`, `tel`, `checkbox` and so on.
- **Auto-close.** Type `<div>` and `</div>` is added. Typing `</` closes the nearest open tag.
- **Auto quotes.** `class=` becomes `class=""`.
- **Hover docs** for elements and attributes, with MDN links.
- **Embedded CSS and JavaScript** IntelliSense inside `<style>` and `<script>`.
- **Emmet.** `div.card>p` expands to full HTML, with nothing to set up.

All of this works as soon as the extension is installed; there is nothing to configure.

## Requirements

You need an extension that provides the `django-html` language. For example, [Django](https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django) by Baptiste Darthenay provides the language, highlighting and snippets.

## Settings it sets for you

The extension ships these as defaults, so your own settings always win:

- `emmet.includeLanguages`: `"django-html": "html"`, for Emmet in templates.
- `[django-html]`: suggestions open inside attribute values (`editor.quickSuggestions`), and accepting one replaces the word under the cursor (`editor.suggest.insertMode`), as in plain HTML files.

If you already set `emmet.includeLanguages` yourself, your value replaces the default. Add `"django-html": "html"` to it to keep Emmet in templates.

## Notes

- If the **Auto Close Tag** extension also runs in Django templates, every closing tag is inserted twice. The extension notices this when a template opens, and offers to turn Auto Close Tag off for `django-html`.
- The HTML language server reads `{% %}` and `{{ }}` as plain text. Suggestions inside a template tag, such as `<div {% if x %}class="a"{% endif %}>`, can be less accurate than in plain HTML.
- The HTML formatter is offered for `django-html` files too. If you format templates with djLint or another tool, set it as the default formatter for `[django-html]`.

## How it works

The built-in HTML language features extension lets other extensions add languages through the `htmlLanguageParticipants` contribution point. This extension adds `django-html` with `autoInsert` turned on. When a Django template opens, it also activates the built-in HTML extension, which on its own only starts for `html` and `handlebars` files.

The Emmet and suggestion settings are contributed as configuration defaults. The extension runs no language server of its own.

## License

[MIT](LICENSE)
