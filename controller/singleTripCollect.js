const singleTripCollectModel = require("../model/singleTripCollect");

const singleTripCollectController = {
  createCollect: async (req, res) => {
    const { dayTripId, tripList } = req.body
    let json;
    if (!dayTripId && dayTripId !== 0) {
      json = {
        success: false,
        errMsg: "缺少 dayTripId"
      };
      return res.status(403).json(json)
    }

    if (!tripList || tripList.length === 0) {
      json = {
        success: false,
        errMsg: "缺少 tripList"
      };
      return res.status(403).json(json)
    }

    const promiseArr = []
    tripList.forEach(trip => {
      const { id, startTime, endTime, is_collect } = trip
      const payload = {
        location_id: id,
        daytrip_id: dayTripId,
        start_time: startTime,
        end_time: endTime,

      }
      promiseArr.push(singleTripCollectModel.createCollect(payload))
    })

    Promise.all(promiseArr)
      .then(result => {
        console.log("promise.all", result);
        json = {
          success: true,
        }
        return res.status(200).json(json)
      })
      .catch(err => {
        console.log(err);
        json = {
          success: false,
          trip: {},
          errMsg: "發生錯誤",
          errDetail: err
        }
        return res.status(400).json(json)
      })
    // if (result && Array.isArray(result.rows)) {
    //   json = {
    //     success: true,
    //     dayTrip: result.rows[0],
    //   };

    //   res.status(200).json(json)
    // } else {
    //   json = {
    //     success: false,
    //     dayTrip: {},
    //   };

    //   res.status(400).json(json)
    // }
  }
};

module.exports = singleTripCollectController;
