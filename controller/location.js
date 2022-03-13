const locationModel = require("../model/location");

const locationController = {
  getAllLocation: async (req, res) => {
    let json;
    const result = await locationModel.getAllLocation();
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        locationList: result.rows,
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        locationList: null,
        errMsg: "發生錯誤",
      };

      res.status(400).json(json)
    }

  },
  deleteLocation: async (req, res) => {
    const { locationId } = req.body
    let json;
    if (!locationId && locationId !== 0) {
      json = {
        success: false,
        errMsg: "缺少 locationId 欄位"
      };
      return res.status(403).json(json)
    }
    const result = await locationModel.deleteLocation(locationId);
    if (result) {
      json = {
        success: true,
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        errMsg: "發生錯誤",
      };

      res.status(400).json(json)
    }

  },
  createLocation: async (req, res) => {
    const { name, address, category, lat, lng, is_collect } = req.body
    let json;
    if (!name || !lat || !lng) {
      json = {
        success: false,
        location: null,
        errMsg: "必填欄位未填寫"
      };
      return res.status(403).json(json)
    }
    const result = await locationModel.createLocation({ name, address, category, lat, lng, is_collect });
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        location: result.rows[0],
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        location: null,
        errMsg: "發生錯誤",
      };

      res.status(400).json(json)
    }

  },
};

module.exports = locationController;
