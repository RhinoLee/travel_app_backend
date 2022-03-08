const locationModel = require("../model/location");

const locationController = {
  createLocation: async (req, res) => {
    const { name, address, category, lat, lng } = req.body
    let json;
    if (!name || !lat || !lng) {
      json = {
        success: false,
        location: null,
        errMsg: "必填欄位未填寫"
      };
      res.status(403).json(json)
    }
    const result = await locationModel.createLocation({ name, address, category, lat, lng });
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
      };

      res.status(400).json(json)
    }

  },
};

module.exports = locationController;
