const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// DB Setting
const db = require("./db.js");
// const port = (process.env.PORT || process.env.DB_PORT);
const port = 5001;

// controller
const timeZoneController = require("./controller/timezone")
const travelController = require("./controller/travel")

const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
app.use(jsonParser);
app.use(urlencodedParser);

// 時區表
app.get("/timezone", timeZoneController.getTimeZoneList)

// travel CRUD
app.get("/travel", travelController.getAllTravel)
app.post("/travel", travelController.createTravel)
app.delete("/travel", travelController.deleteTravel)

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});