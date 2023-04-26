const express = require("express");
const app = express();
app.use(express.static("public"));
const PORT = 4000;
const proxy = require("http-proxy-middleware");
const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use("/graphql", proxy({ target: apiProxyTarget }));
  console.log("graph");
}

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
