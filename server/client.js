const { Client } = require("pg");
require("dotenv").config();

const client = new Client(
  "postgresql://abdullah:0O9FWwInWUs6kqvOMDO2zg@tiger-calf-11883.8nj.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
);

client.connect();

module.exports = client;
