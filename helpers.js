var store = require("store");
var expirePlugin = require("store/plugins/expire");
store.addPlugin(expirePlugin);
const utils = require("./utils.js");
const sectionLib = require("./full_section_lib.js");

module.exports = {
  getActiveTheme: async function () {
    var fetchUrl = "/themes/active";
    var method = "GET";
    var results = await fetch(fetchUrl, { method: method });
    var json = await results.json();
    return json.data;
  },

  updateActiveTheme: async function (themeId) {
    let fetchUrl = "/themes/update";
    let data = { themeId: parseInt(themeId) };
    let response = await fetch(fetchUrl, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    return response;
  },

  getAllThemesAwaitable: async function (returnFullData) {
    var fetchUrl = "/api/themes";
    var method = "GET";
    var results = await fetch(fetchUrl, { method: method });
    var json = await results.json();
    let response = json.data;
    let hasError = "errors" in json.data;
    if (hasError) {
      response = store.get("themeList");
    } else {
      store.set("themeList", json.data);
    }
    if (returnFullData) {
      return response.themes;
    }
    return response.themes.map((theme) => theme.id);
  },

  getAvailableSections: async function () {
    return sectionLib.sections;
    //var fetchUrl = "/sections/";
    // var method = "GET";
    // var results = await fetch(fetchUrl, { method: method });
    // var json = await results.json();
    // return json.data.sections;
  },

  putSection: function (themeId, sectionName) {
    var fetchUrl = "/sections/api/themes/" + themeId + "/assets.json";
    var method = "PUT";
    var data = { asset: { key: sectionName, value: "dummy" } };
    fetch(fetchUrl, {
      method: method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  putTemplate: async function (
    themeId,
    pageName,
    prefix,
    templateData,
    isNewPage
  ) {
    // create unique (non-global) sections
    let promises = [];
    for (let i = 0; i < templateData.uniqueSections.length; i++) {
      var fetchUrl = "/sections/api/themes/" + themeId + "/assets.json";
      var method = "PUT";
      var data = {
        asset: { key: templateData.uniqueSections[i], value: "dummy" },
      };
      promises.push(
        fetch(fetchUrl, {
          method: method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }).then((response) => response.json())
      );
    }
    for (let i = 0; i < templateData.uniqueSections.length; i++) {
      await promises[i];
    }

    let templateName = utils.sanitizeFilename(pageName);
    // var fetchUrl = "/api/themes/" + themeId + "/assets.json";
    var fetchUrl = "/pages/create/" + themeId;
    var method = "PUT";
    var data = {
      templateData: {
        asset: {
          key: "templates/" + prefix + templateName + ".liquid",
          value: templateData.templateContent,
        },
      },
      pageData: {
        page: {
          title: pageName,
          template_suffix: templateName,
        },
      },
      isNewPage: isNewPage,
    };
    return fetch(fetchUrl, {
      method: method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },

  deleteSection: function (themeId, sectionName) {
    var fetchUrl =
      "sections/api/themes/" +
      themeId +
      "/assets.json?asset[key]=sections/" +
      sectionName +
      ".liquid";
    var method = "DELETE";
    fetch(fetchUrl, { method: method })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  deleteTemplate: async function (themeId, templateName) {
    var fetchUrl =
      "/api/themes/" + themeId + "/assets.json?asset[key]=" + templateName;
    var method = "DELETE";
    return fetch(fetchUrl, { method: method })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  getAllTemplatesAwaitable: async function (themeId) {
    var fetchUrl = "/api/themes/" + themeId + "/assets.json";
    var method = "GET";
    var response = await fetch(fetchUrl, { method: method });
    var responseJSON = await response.json();
    let templateList = [];
    for (let i = 0; i < responseJSON.data.assets.length; i++) {
      let asset = responseJSON.data.assets[i];
      if (asset.key.includes("templates/")) {
        templateList.push(asset);
      }
    }
    return templateList;
  },

  getFAQ: async function () {
    var response = await fetch("/support/faq", { method: "GET" });
    var responseJSON = await response.json();
    return responseJSON;
  },

  getAssets: async function (themeId) {
    let assets = store.get("assets");
    if (assets) {
      return assets;
    }

    var fetchUrl = "/api/themes/" + themeId + "/assets.json";
    var method = "GET";
    var response = await fetch(fetchUrl, { method: method });
    var responseJSON = await response.json();

    if (responseJSON.data.assets) {
      store.set("sections", responseJSON, new Date().getTime() + 10000);
    }
    return responseJSON;
  },

  getTemplateContent: async function (themeId, templateName) {
    var method = "GET";
    var fetchUrl =
      "/api/themes/" +
      themeId +
      "/assets.json?asset[key]=templates/" +
      templateName;
    let results = await fetch(fetchUrl, { method: method });
    results = await results.json();
    return results;
  },

  getActiveSectionsAwaitable: async function (themeId, boodlOnly) {
    var fetchUrl = "/api/themes/" + themeId + "/assets.json";
    var method = "GET";
    var response = await fetch(fetchUrl, { method: method });
    var responseJSON = await response.json();
    let ourSections = {};
    for (let i = 0; i < responseJSON.data.assets.length; i++) {
      let asset = responseJSON.data.assets[i];
      if (
        ((!boodlOnly && asset.key.includes("sections/")) ||
          asset.key.includes("sections/boodl-")) &&
        !asset.key.includes("-boodl-uniq-")
      ) {
        ourSections[asset.key] = true;
      }
    }
    return ourSections;
  },

  getActiveSectionsDBAwaitable: async function () {
    var fetchUrl = "/sections/active";
    var method = "GET";
    var response = await fetch(fetchUrl, { method: method });
    var responseJSON = await response.json();
    let ourSections = {};
    for (let i = 0; i < responseJSON.data.assets.length; i++) {
      let asset = responseJSON.data.assets[i];
      if (asset.key.includes("sections/boodl-")) {
        ourSections[asset.key] = true;
      }
    }
    return ourSections;
  },

  getAccountDetails: async function () {
    var fetchUrl = "/account/details";
    var method = "GET";
    var results = await fetch(fetchUrl, { method: method });
    var json = await results.json();
    return json.data;
  },

  getSubscriptionPlans: async function () {
    let response = store.get("subscriptionList");
    if (response) {
      return response;
    }
    var fetchUrl = "/subscriptions";
    var method = "GET";
    var results = await fetch(fetchUrl, { method: method });
    var json = await results.json();
    store.set("subscriptionList", json.data, new Date().getTime() + 1000000);
    return json.data;
  },

  activateAgency: async function (agencyCode) {
    let fetchUrl = "/account/agency/activate";
    let method = "PUT";
    let data = { accessCode: agencyCode };
    let response = await fetch(fetchUrl, {
      method: method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return response;
  },

  clearAllSections: async function (themeId) {
    var fetchUrl = "/clear/sections/" + themeId + "/0";
    var method = "DELETE";
    return fetch(fetchUrl, { method: method })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  clearAllBoodl: async function (themeId, isActiveTheme) {
    var fetchUrl = "/clear/theme/" + themeId + "/" + isActiveTheme;
    var method = "DELETE";
    return fetch(fetchUrl, { method: method })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  getAvailableUpdates: async function () {
    var fetchUrl = "/account/available_updates";
    var method = "GET";
    var results = await fetch(fetchUrl, { method: method });
    var json = await results.json();
    return json.data;
  },

  sleep: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
