const express = require("express");

const app = express();

const pingRoutes = require("./routes/pingRoutes");

const { PORT } = require("./config/serverConfig");

app.use("/api/v1/ping", pingRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
