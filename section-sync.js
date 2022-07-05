require("isomorphic-fetch");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const sectionLib = require("./full_section_lib.js");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const fs = require("fs"),
  path = require("path"),
  assert = require("assert"),
  mongoUri =
    "mongodb+srv://tristan-admin:" +
    process.env.MONGO_PW +
    "@dev-cluster-mpd8o.mongodb.net/test?retryWrites=true&w=majority",
  dbName = "boodl",
  mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true });
var db;

console.log("Connecting to DB...");
mongoClient.connect(function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db(dbName);
  async function syncSections() {
    console.log("Reading file...");
    let jsonData = sectionLib.sections;

    let promises = [];
    let sectionCollection = db.collection("sections");

    try {
      console.log("Executing queries...");
      for (let i = 0; i < jsonData.length; i++) {
        let result = sectionCollection.updateOne(
          { sectionName: jsonData[i].sectionName },
          { $set: jsonData[i] },
          { upsert: true }
        );
        promises.push(result);
      }

      console.log("Awaiting responses...");
      for (let i = 0; i < jsonData.length; i++) {
        await promises[i];
      }

      console.log("DONE");
      console.log(
        "=========================================================================================================="
      );
    } catch (err) {
      console.log("ERROR!");
      console.log(err.message);
    }
    process.exit(0);
    db.close();
  }
  let result = (async function () {
    await syncSections();
  })();
});
