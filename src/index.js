const express = require("express");
const bodyParser = require("body-parser");
const responseTime = require("response-time");

const app = express();

const APIrouter = require("./routes/api_router");

const { PORT, DB_FORCE, DB_ALTER } = require("./config/serverConfig");

const db = require("./config/db_config");

app.use(responseTime());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", APIrouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  if (DB_FORCE == true) {
    await db.sync({ force: true });
  } else if (DB_ALTER == true) {
    await db.sync({ alter: true });
  } else {
    await db.sync();
  }
  console.log("Database connected");
});
