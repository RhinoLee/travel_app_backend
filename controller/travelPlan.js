const travelPlanModel = require("../model/travelPlan");

const travelPlanController = {
  getAllPlan: async (req, res) => {
    const result = await travelPlanModel.getAllPlan();
    if (result && Array.isArray(result.rows)) {
      const json = {
        success: true,
        travelPlanList: result.rows,
      };
      res.status(200).json(json);
    } else {
      const json = {
        success: false,
        travelPlanList: [],
        error: "error",
      };
      res.status(404).json(json);
    }
  },
  getPlan: async (req, res) => {
    const planId = req.params.planId
    let json;
    if (!planId && planId !== 0) {
      json = {
        success: false,
        travel: null,
        error: "未帶 planId",
      }

      return res.status(403).json(json);
    }
    const result = await travelPlanModel.getPlan(planId)
    if (result && result.rows[0]) {
      const json = {
        success: true,
        travel: result.rows[0]
      }

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        travel: null,
        error: "發生錯誤",
      }

      res.status(400).json(json)
    }
  },
  createPlan: async (req, res) => {
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

    const result = await travelPlanModel.createPlan({
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
  deletePlan: async (req, res) => {
    const { planId } = req.body
    let json;
    if (!planId && planId !== 0) return

    const result = await travelPlanModel.deletePlan(planId)
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

module.exports = travelPlanController;
