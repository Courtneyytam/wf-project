require("isomorphic-fetch");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const Koa = require("koa");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const next = require("next");
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");

const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const Router = require("koa-router");
const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const assert = require("assert");
const mongoUri =
  "mongodb+srv://tristan-admin:" +
  process.env.MONGO_PW +
  "@dev-cluster-mpd8o.mongodb.net/test?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true });
const dbName = "boodl";
var db;

const sectionLib = require("./full_section_lib.js");
const promoCodes = require("./promo_codes.js");
const utils = require("./utils.js");
// import sectionLib from './full_section_lib';

// Use connect method to connect to the server
mongoClient.connect(function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;

const fs = require("fs"),
  path = require("path");

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(helmet.dnsPrefetchControl());
  server.use(helmet.hidePoweredBy());
  server.use(helmet.hsts());
  server.use(helmet.noSniff());
  server.use(helmet.xssFilter());
  server.use(bodyParser());

  server.use(session({ secure: true, sameSite: "none" }, server));
  // server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  // scopes: ['read_themes', 'write_themes', 'read_content', 'write_content'],

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ["read_themes", "write_themes"],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        let cookieOptions = { httpOnly: false, secure: true, sameSite: "none" };
        ctx.cookies.set("shopOrigin", shop, cookieOptions);
        ctx.cookies.set("accessToken", accessToken, cookieOptions);

        let clientData = await db
          .collection("clients")
          .findOne({ shopOrigin: shop }, {});
        let isNewInstall = clientData == null || clientData.planLevel == 0;

        if (isNewInstall) {
          let clientData = {};
          if (clientData == null) {
            clientData = {
              shopOrigin: shop,
              dateRegistered: new Date(),
              accessToken: accessToken,
              planName: "unregistered",
              planLevel: 0,
              planActivated: false,
              hasAccessToFreeTrial: true,
            };
          } else {
            clientData = {
              shopOrigin: shop,
              dateReRegistered: new Date(),
              accessToken: accessToken,
              planName: "unregistered",
              planLevel: 0,
              planActivated: false,
            };
          }
          db.collection("clients").update(
            { shopOrigin: shop },
            clientData,
            { upsert: true },
            function (err, result) {
              console.log(err);
            }
          );
        }

        var uninstallWebhook = registerWebhook({
          address: `${HOST}/webhooks/app/uninstalled`,
          topic: "APP_UNINSTALLED",
          accessToken,
          shop,
          apiVersion: ApiVersion.October19,
        });

        uninstallWebhook = await uninstallWebhook;
        if (uninstallWebhook.success) {
          console.log("Successfully registered uninstall webhook!");
        } else {
          console.log(
            "Failed to register uninstall webhook",
            uninstallWebhook.result
          );
        }

        ctx.redirect("https://" + shop + "/admin/apps/" + SHOPIFY_API_KEY);
        // console.log(ctx.req);
        // ctx.redirect('/');
        //console.log(ctx.req);
        // console.log(ctx.req.url);
        // console.log(ctx.req.headers.referer);
        // console.log(ctx.req._parsedUrl.pathname);
        // only redirect on first install
        // if ( ctx.req.headers.referer.indexOf(process.env.HOST) == -1 ) {
        //   console.log("REDIRECT");
        //   await ctx.redirect("/account");
        // }
      },
    })
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post("/webhooks/app/uninstalled", webhook, async (ctx) => {
    await db
      .collection("clients")
      .update(
        { shopOrigin: ctx.state.webhook.domain },
        { $set: { planActivated: false, planLevel: 0 } }
      );
    // Record uninstall data
    // let allThemes = await fetch("https://" + ctx.state.webhook.domain + "/admin/api/2019-10/themes.json", {
    //   headers: {
    //     'X-Shopify-Access-Token': ctx.cookies.get('accessToken'),
    //     'content-type': 'application/json'
    //   },
    //   method: "GET"
    // });
    // console.log(allThemes);
    ctx.body = {
      status: "success",
      data: {},
    };
  });

  router.post("/webhooks/customers/redact", webhook, async (ctx) => {
    console.log("Received customer redact");
    await db.collection("gdprRequests").insert({
      shopOrigin: ctx.state.webhook.domain,
      request: "customers/redact",
      date: new Date(),
    });
    ctx.body = {
      status: "success",
      data: {},
    };
  });

  router.post("/webhooks/customers/data_request", webhook, async (ctx) => {
    console.log("Received customer data request");
    await db.collection("gdprRequests").insert({
      shopOrigin: ctx.state.webhook.domain,
      request: "customers/data_request",
      date: new Date(),
    });
    ctx.body = {
      status: "success",
      data: {},
    };
  });

  router.post("/webhooks/shop/redact", webhook, async (ctx) => {
    console.log("Received shop redact");
    await db.collection("gdprRequests").insert({
      shopOrigin: ctx.state.webhook.domain,
      request: "shop/redact",
      date: new Date(),
    });
    ctx.body = {
      status: "success",
      data: {},
    };
  });

  server.use(graphQLProxy({ version: ApiVersion.October19 }));

  router.put("/account/agency/activate", async (ctx) => {
    try {
      // let agencyCode = await db.collection('agencyPassCodes').findOne({agencyCode: ctx.request.body.accessCode}, {});
      let agencyCode =
        ctx.request.body.accessCode in promoCodes.codes
          ? promoCodes.codes[ctx.request.body.accessCode]
          : null;
      if (agencyCode) {
        // disable auto registration - force user through normal shopify pay flow
        // successfully registered agency account
        // let clientData = await db.collection('clients').findOne({shopOrigin: ctx.cookies.get('shopOrigin')});
        // let deleteResults = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/recurring_application_charges/"+ clientData.chargeId + ".json", {
        //   headers: {
        //     'X-Shopify-Access-Token': ctx.cookies.get('accessToken')
        //   },
        //   method: "DELETE",
        // });
        // await db.collection('clients').update({shopOrigin: ctx.cookies.get('shopOrigin')}, {$set: {planActivated: true, planLevel: 2, planName:"Agency", codeUsed:ctx.request.body.accessCode}});

        ctx.body = {
          status: "success",
          data: { message: agencyCode.description },
        };
      } else {
        ctx.body = {
          status: "error",
          data: { message: "Invalid code." },
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.get("/subscriptions", async (ctx) => {
    try {
      let subscriptionPlans = await db
        .collection("subscriptionPlans")
        .find({ visible: true }, {})
        .toArray();
      ctx.body = {
        status: "success",
        data: subscriptionPlans,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/subscriptions/update/complete", async (ctx) => {
    try {
      let chargeId = ctx.request.query.charge_id;
      let data = {
        recurring_application_charge: {},
      };

      const response = await fetch(
        `https://${ctx.cookies.get(
          "shopOrigin"
        )}/admin/api/2019-10/recurring_application_charges/${chargeId}/activate.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
          body: JSON.stringify(data),
        }
      );
      const responseJson = await response.json();
      const confirmationUrl =
        responseJson.recurring_application_charge.confirmation_url;
      await db
        .collection("clients")
        .update({ shopOrigin: ctx.cookies.get("shopOrigin") }, [
          {
            $set: {
              planActivated: true,
              chargeId: chargeId,
              planLevel: "$candidatePlanLevel",
              planName: "$candidatePlanName",
              hasAccessToFreeTrial: false,
            },
          },
        ]);
      // await ctx.redirect("/account")
      ctx.redirect(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/apps/" +
          SHOPIFY_API_KEY +
          "/account"
      );

      ctx.body = {
        status: "success",
        data: {},
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.get("/subscriptions/update/:planId/:promoCode?", async (ctx) => {
    try {
      let subscriptionPlan = db
        .collection("subscriptionPlans")
        .findOne({ _id: ObjectId(ctx.params.planId) }, {}, undefined);

      let promoCodeData = null;
      if (ctx.params.promoCode) {
        // promoCodeData = db.collection('agencyPassCodes').findOne({agencyCode: ctx.params.promoCode}, {}, undefined);
        promoCodeData =
          ctx.params.promoCode in promoCodes.codes
            ? promoCodes.codes[ctx.params.promoCode]
            : null;
      }
      let clientData = db
        .collection("clients")
        .findOne({ shopOrigin: ctx.cookies.get("shopOrigin") });

      subscriptionPlan = await subscriptionPlan;
      // promoCodeData = await promoCodeData;
      clientData = await clientData;

      let price = subscriptionPlan.price.amount;
      if (promoCodeData) {
        price = promoCodeData.price;
      }

      let trialDays = subscriptionPlan.trialDays;
      let isTestCharge =
        ctx.cookies.get("shopOrigin").indexOf("cttm-dev-store") > -1; // || ctx.cookies.get('shopOrigin').indexOf("boodl-demo") > -1;
      if (!clientData.hasAccessToFreeTrial) {
        trialDays = 0;
      }
      let data = {
        recurring_application_charge: {
          name:
            subscriptionPlan.planName +
            (promoCodeData ? " - " + promoCodeData.agencyName : ""),
          price: price,
          return_url: process.env.HOST + "/subscriptions/update/complete",
          test: isTestCharge ? true : null,
          trial_days: trialDays,
        },
      };

      // Wait for them to approve charges
      const response = await fetch(
        `https://${ctx.cookies.get(
          "shopOrigin"
        )}/admin/api/2019-10/recurring_application_charges.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
          body: JSON.stringify(data),
        }
      );

      const responseJson = await response.json();
      if (responseJson.errors) {
        throw responseJson.errors;
      }

      await db.collection("clients").update(
        { shopOrigin: ctx.cookies.get("shopOrigin") },
        {
          $set: {
            candidatePlanLevel: subscriptionPlan.planLevel,
            candidatePlanName: subscriptionPlan.planName,
            promoCode: ctx.params.promoCode,
          },
        }
      );
      // delete sections that no longer are available (disabeld because can't do this on uninstall)
      // let allThemes = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/themes.json", {
      //   headers: {
      //     'X-Shopify-Access-Token': ctx.cookies.get('accessToken'),
      //     'content-type': 'application/json'
      //   },
      //   method: "GET"
      // });
      // allThemes = await allThemes.json();
      // for (let i = 0; i < allThemes.themes.length; i++) {
      //   fetch(HOST + "/clear/sections/" + allThemes.themes[i].id + "/" + subscriptionPlan.planLevel, { method: "DELETE", headers: { cookie: ctx.request.header.cookie } });
      // }

      const confirmationUrl =
        responseJson.recurring_application_charge.confirmation_url;
      await ctx.redirect(confirmationUrl);
    } catch (err) {
      console.log(err);
      ctx.redirect("/account?error=true");
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.get("/account/details", async (ctx) => {
    try {
      let clientData = await db
        .collection("clients")
        .findOne(
          { shopOrigin: ctx.cookies.get("shopOrigin") },
          { projection: { planName: 1, planLevel: 1, planActivated: 1 } }
        );
      ctx.body = {
        status: "success",
        data: clientData,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/account/available_updates", async (ctx) => {
    try {
      let outdatedSections = [];
      let clientSections = await db
        .collection("activeSections")
        .find({ shopOrigin: ctx.cookies.get("shopOrigin") })
        .toArray();

      for (activeSection of clientSections) {
        let sectionData = sectionLib.sections.filter(
          (section) => activeSection.sectionName == section.sectionName
        )[0];
        if (
          !activeSection.hasOwnProperty("version") ||
          activeSection.version < sectionData.version
        ) {
          outdatedSections.push(activeSection.sectionName);
        }
      }

      ctx.body = {
        status: "success",
        data: { availableUpdates: outdatedSections },
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.get("/sections/", async (ctx) => {
    try {
      let clientData = await db
        .collection("clients")
        .findOne({ shopOrigin: ctx.cookies.get("shopOrigin") });
      // let availableSections = await db.collection('sections').find({}, {projection: {_id: 0}}).toArray();
      let results = { sections: [] };
      if (clientData) {
        results = { sections: sectionLib.sections };
      }
      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.get("/sections/active", async (ctx) => {
    try {
      // TODO: Verify accessToken against db
      let activeSections = await db
        .collection("activeSections")
        .find(
          { shopOrigin: ctx.cookies.get("shopOrigin") },
          { projection: { _id: 0, planLevel: 0 } }
        )
        .toArray();
      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.get("/api/:object", async (ctx) => {
    try {
      // const results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-04/" + ctx.params.object + ".json", {
      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          ".json",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });
      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/api/:object/:id/:file", async (ctx) => {
    try {
      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          "/" +
          ctx.params.id +
          "/" +
          ctx.params.file +
          ctx.request.search,
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });
      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/sections/api/:object/:id/:file", async (ctx) => {
    try {
      let sectionName = ctx.request.search
        .split("sections/")[1]
        .replace(".liquid", "");
      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          "/" +
          ctx.params.id +
          "/" +
          ctx.params.file +
          ctx.request.search,
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      // TODO: only call delete once
      let deleteResult = await db.collection("activeSections").deleteOne({
        shopOrigin: ctx.cookies.get("shopOrigin"),
        sectionName: sectionName,
      });
      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.delete("/api/:object/:id/:file", async (ctx) => {
    try {
      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          "/" +
          ctx.params.id +
          "/" +
          ctx.params.file +
          ctx.request.search,
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  // Clears all boodl sections with planLevel >= accessLevel from a given theme.
  router.delete("/clear/sections/:themeId/:accessLevel", async (ctx) => {
    try {
      let activeSections = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/themes/" +
          ctx.params.themeId +
          "/assets.json",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          method: "GET",
        }
      );
      activeSections = await activeSections.json();

      // could cache at server startup time
      let boodlSections = await db
        .collection("sections")
        .find(
          { planLevel: { $gt: parseInt(ctx.params.accessLevel) } },
          { projection: { sectionName: 1 } }
        )
        .toArray();
      let boodlSectionNames = {};
      for (let i = 0; i < boodlSections.length; i++) {
        boodlSectionNames[boodlSections[i].sectionName] = true;
      }

      let promises = [];
      for (let i = 0; i < activeSections.assets.length; i++) {
        let assetName = activeSections.assets[i].key;
        let chunks = assetName.split("/");
        if (
          boodlSectionNames.hasOwnProperty(
            chunks[chunks.length - 1]
              .split("-boodl-uniq")[0]
              .replace(".liquid", "")
          )
        ) {
          let deletionCall = fetch(
            "https://" +
              ctx.cookies.get("shopOrigin") +
              "/admin/api/2019-10/themes/" +
              ctx.params.themeId +
              "/assets.json?asset[key]=" +
              assetName,
            {
              headers: {
                "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
              },
              method: "DELETE",
            }
          );
          promises.push(deletionCall);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        await promises[i];
      }

      ctx.body = {
        status: "success",
        data: {},
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.delete("/clear/theme/:themeId/:isActive", async (ctx) => {
    try {
      let activeSections = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/themes/" +
          ctx.params.themeId +
          "/assets.json",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
          method: "GET",
        }
      );
      activeSections = await activeSections.json();

      let promises = [];
      let response = {};
      for (let i = 0; i < activeSections.assets.length; i++) {
        let assetName = activeSections.assets[i].key;
        if (assetName.includes("boodl-")) {
          let deletionCall = fetch(
            "https://" +
              ctx.cookies.get("shopOrigin") +
              "/admin/api/2019-10/themes/" +
              ctx.params.themeId +
              "/assets.json?asset[key]=" +
              assetName,
            {
              headers: {
                "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
              },
              method: "DELETE",
            }
          );
          promises.push(deletionCall);
        }
      }
      for (let i = 0; i < activeSections.assets.length; i++) {
        await promises[i];
      }

      // inject css/js
      const theme = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/themes/" +
          ctx.params.themeId +
          "/assets.json?asset[key]=layout/theme.liquid",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });
      let templateContent = theme.asset.value;

      // remove boodl asset imports from theme.liquid
      if (templateContent.includes("boodl-webflow.css")) {
        let assetFilenames = [
          "boodl-normalize.css",
          "boodl-webflow.css",
          "boodl-main.js",
          "boodl-animate.js",
          "boodl-init.js",
        ];
        for (let i = 0; i < assetFilenames.length; i++) {
          templateContent = templateContent.replace(
            "{{ '" +
              assetFilenames[i] +
              "' | asset_url | " +
              (assetFilenames[i].includes(".js")
                ? "script_tag"
                : "stylesheet_tag") +
              " }}",
            ""
          );
        }
        templateContent = templateContent.replace(
          `<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>`,
          ""
        );
        let templateData = {
          asset: { key: "layout/theme.liquid", value: templateContent },
        };
        response = await fetch(
          "https://" +
            ctx.cookies.get("shopOrigin") +
            "/admin/api/2019-10/themes/" +
            ctx.params.themeId +
            "/assets.json",
          {
            headers: {
              "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
              "content-type": "application/json",
            },
            body: JSON.stringify(templateData),
            method: "PUT",
          }
        )
          .then((response) => response.json())
          .then((json) => {
            return json;
          });
      }

      if (ctx.params.isActive == "true") {
        let deleteResult = await db
          .collection("activeThemes")
          .deleteOne({ shopOrigin: ctx.cookies.get("shopOrigin") });
      }

      ctx.body = {
        status: "success",
        data: response,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "error",
        data: err,
      };
    }
  });

  router.put("/themes/update", async (ctx) => {
    try {
      await db.collection("activeThemes").update(
        { shopOrigin: ctx.cookies.get("shopOrigin") },
        {
          shopOrigin: ctx.cookies.get("shopOrigin"),
          themeId: ctx.request.body.themeId,
        },
        { upsert: true }
      );

      // inject css/js
      const theme = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/themes/" +
          ctx.request.body.themeId +
          "/assets.json?asset[key]=layout/theme.liquid",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });
      let templateContent = theme.asset.value;

      // inject necessary assets
      let response = {};
      if (!templateContent.includes("boodl-webflow.css")) {
        console.log("Updating theme content");
        // TOOD: if we host via cdn, don't need to do this
        let assetFilenames = [
          "boodl-normalize.css",
          "boodl-webflow.css",
          "boodl-main.js",
          "boodl-animate.js",
          "boodl-init.js",
        ];
        let promises = [];
        let headerInjectionText = "";
        let footerInjectionText = `  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js" type="text/javascript" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>\n`;
        for (let i = 0; i < assetFilenames.length; i++) {
          let isJS = assetFilenames[i].includes(".js");
          let filePath = path.join(__dirname, "assets/" + assetFilenames[i]);
          let text = await fs.promises.readFile(filePath, {
            encoding: "utf-8",
          });
          let data = {
            asset: { key: "assets/" + assetFilenames[i], value: text },
          };
          let includeString =
            "  {{ '" +
            assetFilenames[i] +
            "' | asset_url | " +
            (isJS ? "script_tag" : "stylesheet_tag") +
            " }}\n";
          if (isJS) {
            footerInjectionText += includeString;
          } else {
            headerInjectionText += includeString;
          }
          let results = fetch(
            "https://" +
              ctx.cookies.get("shopOrigin") +
              "/admin/api/2019-10/themes/" +
              ctx.request.body.themeId +
              "/assets.json",
            {
              headers: {
                "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
              method: "PUT",
            }
          );
          promises.push(results);
        }
        for (let i = 0; i < assetFilenames.length; i++) {
          await promises[i];
        }
        footerInjectionText += "</html>";
        // let boodlIncludesString = "{{ 'boodl-normalize.css' | asset_url | stylesheet_tag }}\n{{ 'boodl-webflow.css' | asset_url | stylesheet_tag }}\n{{ 'boodl-main.js' | asset_url | script_tag }}\n{{ 'boodl-animate.js' | asset_url | script_tag }}"
        headerInjectionText += "</head>";

        // insert the update template
        let templateData = {
          asset: {
            key: "layout/theme.liquid",
            value: templateContent
              .replace("</head>", headerInjectionText)
              .replace("</html>", footerInjectionText),
          },
        };
        response = await fetch(
          "https://" +
            ctx.cookies.get("shopOrigin") +
            "/admin/api/2019-10/themes/" +
            ctx.request.body.themeId +
            "/assets.json",
          {
            headers: {
              "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
              "content-type": "application/json",
            },
            body: JSON.stringify(templateData),
            method: "PUT",
          }
        )
          .then((response) => response.json())
          .then((json) => {
            return json;
          });
      }

      ctx.body = {
        status: "success",
        data: response,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.get("/themes/active", async (ctx) => {
    try {
      let response = await db.collection("activeThemes").findOne(
        { shopOrigin: ctx.cookies.get("shopOrigin") },
        {
          shopOrigin: ctx.cookies.get("shopOrigin"),
          themeId: ctx.request.body.themeId,
        },
        { upsert: true },
        undefined
      );
      ctx.body = {
        status: "success",
        data: response,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.get("/support/faq", async (ctx) => {
    try {
      let response = await db.collection("helpContent").find({}, {}).toArray();
      ctx.body = {
        status: "success",
        data: response,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: err,
      };
    }
  });

  router.put("/api/:object/:id/:file", async (ctx) => {
    try {
      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          "/" +
          ctx.params.id +
          "/" +
          ctx.params.file,
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          body: JSON.stringify(ctx.request.body),
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.put("/pages/create/:themeId", async (ctx) => {
    try {
      // crate/update template
      let mainResults = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/themes/" +
          ctx.params.themeId +
          "/assets.json",
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          body: JSON.stringify(ctx.request.body.templateData),
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      // due to silly shopify page-theme relationship, also create the template in the main theme
      /* let results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/themes.json", {
        headers: {
          'X-Shopify-Access-Token': ctx.cookies.get('accessToken')
        },
        method: "GET",
      })
      .then(response => response.json())
      .then(json => {
        return json;
      });
      let activeThemeId = 10;
      for ( let i = 0; i < results.themes.length; i++ ) {
        if ( results.themes[i].role == "main" ) {
          activeThemeId = results.themes[i].id;
          break;
        }
      }

      if ( activeThemeId != ctx.params.themeId ) {
        results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/themes/" + activeThemeId + "/assets.json", {
          headers: {
            'X-Shopify-Access-Token': ctx.cookies.get('accessToken'),
            'content-type': 'application/json'
          },
          body: JSON.stringify(ctx.request.body.templateData),
          method: "PUT",
        })
        .then(response => response.json())
        .then(json => {
          return json;
        });
      }
      await mainResults;

      // if the template is newly created, then create a new page
      // crate new template
      if ( ctx.request.body.isNewPage ) {
        results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/pages.json", {
          headers: {
            'X-Shopify-Access-Token': ctx.cookies.get('accessToken'),
            'content-type': 'application/json'
          },
          body: JSON.stringify(ctx.request.body.pageData),
          method: "POST",
        })
        .then(response => response.json())
        .then(json => {
          return json;
        });
      } */

      ctx.body = {
        status: "success",
        data: mainResults,
      };
    } catch (err) {
      console.log(err);
    }
  });

  router.put("/sections/api/:object/:id/:file", async (ctx) => {
    try {
      let data = ctx.request.body;
      let sectionName = ctx.request.body.asset.key;

      // verify access
      let clientData = await db
        .collection("clients")
        .findOne({ shopOrigin: ctx.cookies.get("shopOrigin") }, {}, undefined);
      let simplifiedSectionName = sectionName
        .replace(".liquid", "")
        .replace("sections/", "")
        .split("-boodl-uniq")[0];
      let sectionData = sectionLib.sections.filter(
        (section) => section.sectionName == simplifiedSectionName
      )[0];
      if (sectionData.planLevel > clientData.planLevel) {
        db.collection("invalidAccessAttempts").insert({
          shopOrigin: ctx.cookies.get("shopOrigin"),
        });
        throw "Insufficient access level";
      }

      if (ctx.request.body.asset.key.indexOf("-boodl-uniq-") > -1) {
        // duplicate existing section
        data = {
          asset: {
            key: "sections/" + ctx.request.body.asset.key + ".liquid",
            source_key:
              "sections/" +
              ctx.request.body.asset.key.split("-boodl-uniq-")[0] +
              ".liquid",
          },
        };
      } else {
        // TODO: Figure out the proper way to configure security of the file reads (escape / characters)
        let sectionName = ctx.request.body.asset.key
          .split("-boodl-uniq-")[0]
          .replace("sections/", "");
        let filePath = path.join(
          __dirname,
          "sections/" +
            utils.sanitizeFilename(
              ctx.request.body.asset.key
                .split("-boodl-uniq-")[0]
                .replace("sections/") + ".liquid"
            )
        );
        let text = await fs.promises.readFile(filePath, {
          encoding: "utf-8",
        });

        data = {
          asset: {
            key: "sections/" + ctx.request.body.asset.key + ".liquid",
            value: text,
          },
        };
      }

      const results = await fetch(
        "https://" +
          ctx.cookies.get("shopOrigin") +
          "/admin/api/2019-10/" +
          ctx.params.object +
          "/" +
          ctx.params.id +
          "/" +
          ctx.params.file,
        {
          headers: {
            "X-Shopify-Access-Token": ctx.cookies.get("accessToken"),
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      // Todo: only call insert once
      let insertResult = await db.collection("activeSections").update(
        {
          shopOrigin: ctx.cookies.get("shopOrigin"),
          sectionName: sectionName,
        },
        {
          shopOrigin: ctx.cookies.get("shopOrigin"),
          sectionName: sectionName,
          version: sectionData.version,
        },
        { upsert: true }
      );

      ctx.body = {
        status: "success",
        data: results,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        status: "failure",
        data: {},
      };
    }
  });

  router.get("*", verifyRequest(), async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
