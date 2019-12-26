"use strict";


var env = require("node-env-file");
// Load environment variables for localhost
try {
  console.log("__dirname" + __dirname);
  env(__dirname + "//../.env");
} catch (e) {}

const DiscoveryV1 = require('ibm-watson/discovery/v1');

const discovery = new DiscoveryV1({
   apikey: process.env.DISCOVERY_APIKEY ,
  version: '2019-02-01'
});

exports.runQuery = (query, byId, callback) => {
  if (byId === "true") {
    query = "_id:" + query;
  }
  discovery.query(
    {
      environmentId: process.env.ENVIRONMENT_ID,
      collectionId: process.env.COLLECTION_ID,
      query: query,
      count: 20
    },
    function(err, response) {
      if (err) {
        callback(err, false);
      } else {
        callback(response, true);
      }
    }
  );
};
