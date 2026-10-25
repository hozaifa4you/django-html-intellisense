const test = require("node:test");
const assert = require("node:assert/strict");
const { closesTagsIn } = require("../lib/autoCloseTag");

const DEFAULT_LANGUAGES = ["xml", "php", "blade", "jinja", "vue"];

test("Auto Close Tag's own defaults leave Django templates alone", () => {
  assert.equal(
    closesTagsIn("django-html", { activationOnLanguage: DEFAULT_LANGUAGES }),
    false,
  );
});

test("listing django-html turns it on", () => {
  assert.equal(
    closesTagsIn("django-html", {
      activationOnLanguage: [...DEFAULT_LANGUAGES, "django-html"],
    }),
    true,
  );
});

test("a wildcard turns it on", () => {
  assert.equal(
    closesTagsIn("django-html", { activationOnLanguage: ["*"] }),
    true,
  );
});

test("disableOnLanguage wins over the wildcard", () => {
  assert.equal(
    closesTagsIn("django-html", {
      activationOnLanguage: ["*"],
      disableOnLanguage: ["django-html"],
    }),
    false,
  );
});

test("switching Auto Close Tag off wins over everything", () => {
  assert.equal(
    closesTagsIn("django-html", {
      enabled: false,
      activationOnLanguage: ["*"],
    }),
    false,
  );
});
