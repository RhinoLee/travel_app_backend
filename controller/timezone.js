const timeZoneModel = require("../model/timezone");

const timeZoneController = {
  getTimeZoneList: async (req, res) => {
    const result = await timeZoneModel.getTimeZoneList();
    let json;
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        timeZoneIdList: result.rows,
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        timeZoneIdList: [],
      };

      res.status(400).json(json)
    }

  },
};

module.exports = timeZoneController;
