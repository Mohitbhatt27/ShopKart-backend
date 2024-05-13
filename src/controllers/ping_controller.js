function V1pingController(req, res) {
  res.send("pong from v1");
}

function V2pingController(req, res) {
  res.send("pong from v2");
}

module.exports = {
  V1pingController,
  V2pingController,
};
