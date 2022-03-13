const daytripCollectModel = require("../model/daytripCollect");

const daytripCollectController = {
  getAll: async (req, res) => {
    const result = await daytripCollectModel.getAll();
    let json;
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        collectList: result.rows,
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        collectList: [],
      };

      res.status(400).json(json)
    }
  },
  createCollect: async (req, res) => {
    const { name } = req.body
    let json;
    if (!name) {
      json = {
        success: false,
        dayTrip: {},
        errMsg: "行程名稱未填"
      };
      return res.status(403).json(json)
    }
    const result = await daytripCollectModel.createCollect(name)
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        dayTrip: result.rows[0],
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        dayTrip: {},
      };

      res.status(400).json(json)
    }
  }
};

module.exports = daytripCollectController;
