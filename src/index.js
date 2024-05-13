const express = require("express");

const app = express();

const APIrouter = require("./routes/api_router");

const { PORT } = require("./config/serverConfig");

app.use("/api", APIrouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
