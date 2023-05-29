import merge from "lodash.merge";

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3001,
  secret: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

export default merge(defaultConfig, envConfig);
