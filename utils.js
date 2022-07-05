module.exports = {
  toTitleCase: function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  generateRandomString: function () {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
  },

  sanitizeFilename: function (str) {
    return str.replace(/([^A-Za-z0-9_\-\.])+/g, "");
  },
};
