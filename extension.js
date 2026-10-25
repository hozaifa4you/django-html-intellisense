const vscode = require("vscode");
const { closesTagsIn } = require("./lib/autoCloseTag");

const LANGUAGE = "django-html";
const HTML_LANGUAGE_FEATURES = "vscode.html-language-features";
const AUTO_CLOSE_TAG = "formulahendry.auto-close-tag";
const SKIP_AUTO_CLOSE_CHECK = "skipAutoCloseTagCheck";

async function activate(context) {
  await vscode.extensions.getExtension(HTML_LANGUAGE_FEATURES)?.activate();
  void warnAboutAutoCloseTag(context);
}

async function warnAboutAutoCloseTag(context) {
  if (
    !vscode.extensions.getExtension(AUTO_CLOSE_TAG) ||
    context.globalState.get(SKIP_AUTO_CLOSE_CHECK)
  ) {
    return;
  }

  const template = vscode.workspace.textDocuments.find(
    (document) => document.languageId === LANGUAGE,
  );
  const config = vscode.workspace.getConfiguration(
    "auto-close-tag",
    template?.uri,
  );
  const closesTags = closesTagsIn(LANGUAGE, {
    enabled: config.get("enableAutoCloseTag", true),
    activationOnLanguage: config.get("activationOnLanguage", ["*"]),
    disableOnLanguage: config.get("disableOnLanguage", []),
  });
  if (!closesTags) return;

  const turnOff = "Turn it off for Django templates";
  const dontAsk = "Don't ask again";
  const choice = await vscode.window.showWarningMessage(
    "Auto Close Tag also closes tags in Django templates, so every closing tag is inserted twice.",
    turnOff,
    dontAsk,
  );
  if (choice === turnOff) {
    await disableAutoCloseTagIn(config);
  } else if (choice === dontAsk) {
    await context.globalState.update(SKIP_AUTO_CLOSE_CHECK, true);
  }
}

async function disableAutoCloseTagIn(config) {
  const { workspaceFolderValue, workspaceValue } =
    config.inspect("disableOnLanguage") ?? {};
  let target = vscode.ConfigurationTarget.Global;
  if (workspaceFolderValue !== undefined) {
    target = vscode.ConfigurationTarget.WorkspaceFolder;
  } else if (workspaceValue !== undefined) {
    target = vscode.ConfigurationTarget.Workspace;
  }

  const disabled = config.get("disableOnLanguage", []);
  await config.update("disableOnLanguage", [...disabled, LANGUAGE], target);
}

function deactivate() {}

module.exports = { activate, deactivate };
