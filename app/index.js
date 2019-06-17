import express from "express";
import bodyParser from "body-parser";

import router from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = 8000;

app.listen(port, () => {
  console.log("We are live on " + port);
});
