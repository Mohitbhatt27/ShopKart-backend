const express = require("express");
const bodyParser = require("body-parser");
const responseTime = require("response-time");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());

const APIrouter = require("./routes/api_router");

const { PORT, DB_FORCE, DB_ALTER, NODE_ENV } = require("./config/serverConfig");

const db = require("./config/db_config");
const { syncDbInOrder } = require("./models/index");

app.use(responseTime());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", APIrouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  if (NODE_ENV === "production") {
    syncDbInOrder();
  } else {
    if (DB_FORCE == true) {
      await db.sync({ force: true });
    } else if (DB_ALTER == true) {
      await db.sync({ alter: true });
    } else {
      await db.sync();
    }
  }
  console.log("Database connected");
});
