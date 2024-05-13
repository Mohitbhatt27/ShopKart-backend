const express = require("express");
const bodyParser = require("body-parser");
const responseTime = require("response-time");

const app = express();

const APIrouter = require("./routes/api_router");

const { PORT } = require("./config/serverConfig");

const db = require("./config/db_config");

app.use(responseTime());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", APIrouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await db.sync();
  console.log("Database connected");
});
