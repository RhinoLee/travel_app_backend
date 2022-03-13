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
const locationController = require("./controller/location")
const daytripCollectController = require("./controller/daytripCollect")
const singleTripCollectController = require("./controller/singleTripCollect")

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
app.get("/travel/:travelId", travelController.getTravel)
app.post("/travel", travelController.createTravel)
app.delete("/travel", travelController.deleteTravel)

// location CRUD
app.get("/location", locationController.getAllLocation)
app.post("/location", locationController.createLocation)
app.delete("/location", locationController.deleteLocation)

// daytrip_collect CRUD
app.get("/daytrip_collect", daytripCollectController.getAll)
app.post("/daytrip_collect", daytripCollectController.createCollect)

// single_trip_collect CRUD
app.post("/single_trip_collect", singleTripCollectController.createCollect)

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});