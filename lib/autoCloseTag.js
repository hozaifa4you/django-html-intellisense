/**
 * Determines if the auto-close tag feature should be enabled for a given language.
 * @param {string} languageId - The ID of the language.
 * @param {Object} options - The options for the auto-close tag feature.
 * @param {boolean} options.enabled - Whether the feature is enabled.
 * @param {string[]} options.activationOnLanguage - The list of languages for which the feature is activated.
 * @param {string[]} options.disableOnLanguage - The list of languages for which the feature is disabled.
 * @returns {boolean} - True if the feature should be enabled, false otherwise.
 */
function closesTagsIn(
  languageId,
  { enabled = true, activationOnLanguage = ["*"], disableOnLanguage = [] },
) {
  if (!enabled) return false;
  const activated =
    activationOnLanguage.includes("*") ||
    activationOnLanguage.includes(languageId);
  return activated && !disableOnLanguage.includes(languageId);
}

module.exports = { closesTagsIn };
