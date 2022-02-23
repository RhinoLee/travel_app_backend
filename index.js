const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// DB Setting
const db = require("./db.js");
const port = (process.env.PORT || process.env.DB_PORT);

app.use(jsonParser);
app.use(urlencodedParser);


app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});