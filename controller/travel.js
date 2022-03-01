const travelModel = require("../model/travel");

const travelController = {
  getAllTravel: async (req, res) => {
    const result = await travelModel.getAllTravel();
    if (result && Array.isArray(result.rows)) {
      const json = {
        success: true,
        travelList: result.rows,
      };
      res.status(200).json(json);
    } else {
      const json = {
        success: false,
        travelList: [],
        error: "error",
      };
      res.status(404).json(json);
    }
  },
  createTravel: async (req, res) => {
    const { name, intro, description, start_date, end_date, timezone } = req.body;
    let json;
    if (!name) {
      json = {
        success: false,
        data: null,
        errMsg: "旅程名稱為必填欄位",
      };
      return res.status(403).json(json);
    }
    if (!start_date || !end_date) {
      json = {
        success: false,
        data: null,
        errMsg: "時間格式錯誤",
      };
      return res.status(403).json(json);
    }

    const result = await travelModel.createTravel({
      name,
      intro,
      description,
      start_date,
      end_date,
      timezone
    });

    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        data: result.rows[0]
      }
      res.status(200).json(json)
    } else {
      json = {
        success: false,
        data: null,
        errMsg: "發生錯誤",
      }
      res.status(400).json(json)
    }
  },
  deleteTravel: async (req, res) => {
    const { travelId } = req.body
    let json;
    if (!travelId && travelId !== 0) return

    const result = await travelModel.deleteTravel(travelId)
    if (result) {
      json = {
        success: true,
      };
      res.status(200).json(json);
    } else {
      json = {
        success: false,
      };
      res.status(400).json(json);
    }
  }
};

module.exports = travelController;
