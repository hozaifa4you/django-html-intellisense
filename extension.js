const vscode = require("vscode");

const HTML_LANGUAGE_FEATURES = "vscode.html-language-features";

// The built-in HTML language server only activates for html and handlebars
// files, so a session that opens a Django template first would never start
// it. The htmlLanguageParticipants entry in package.json makes the server
// serve django-html once it runs; this makes sure it runs.
async function activate() {
  await vscode.extensions.getExtension(HTML_LANGUAGE_FEATURES)?.activate();
}

function deactivate() {}

module.exports = { activate, deactivate };
