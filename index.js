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
const travelPlanController = require("./controller/travelPlan")
const locationController = require("./controller/location")
const travelSampleController = require("./controller/travelSample")
const locationTripCollectController = require("./controller/locationTripCollect")

const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
app.use(jsonParser);
app.use(urlencodedParser);

// 時區表
app.get("/timezone", timeZoneController.getTimeZoneList)

// travel CRUD
app.get("/travel_plan", travelPlanController.getAllPlan)
app.get("/travel_plan/:planId", travelPlanController.getPlan)
app.post("/travel_plan", travelPlanController.createPlan)
app.delete("/travel_plan", travelPlanController.deletePlan)

// location CRUD
app.get("/location", locationController.getAllLocation)
app.post("/location", locationController.createLocation)
app.delete("/location", locationController.deleteLocation)

// daytrip_collect CRUD
app.get("/travel_sample", travelSampleController.getAll)
app.get("/travel_sample/:sampleId", travelSampleController.getSample)
app.post("/travel_sample", travelSampleController.createSample)

// single_trip_collect CRUD
app.post("/location_trip_collect", locationTripCollectController.createCollect)

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});