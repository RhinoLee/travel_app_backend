const travelSampleModel = require("../model/travelSample");

const travelSampleController = {
  getAll: async (req, res) => {
    const result = await travelSampleModel.getAll();
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
  createSample: async (req, res) => {
    const { name } = req.body
    let json;
    if (!name) {
      json = {
        success: false,
        travelSample: {},
        errMsg: "行程名稱未填"
      };
      return res.status(403).json(json)
    }
    const result = await travelSampleModel.createSample(name)
    if (result && Array.isArray(result.rows)) {
      json = {
        success: true,
        travelSample: result.rows[0],
      };

      res.status(200).json(json)
    } else {
      json = {
        success: false,
        travelSample: {},
      };

      res.status(400).json(json)
    }
  },
  getSample: async (req, res) => {
    const sampleId = req.params.sampleId
    if (!sampleId && sampleId !== 0) {
      json = {
        success: false,
        collectList: [],
        errMsg: "缺少 sampleId"
      };

      return res.status(403).json(json)
    }
    try {
      const result = await travelSampleModel.getSample(sampleId)
      if (result && Array.isArray(result.rows)) {
        json = {
          success: true,
          collectList: result.rows,
        };

        return res.status(200).json(json)
      } else {
        json = {
          success: false,
          collectList: [],
        };

        return res.status(400).json(json)
      }

    } catch (err) {
      json = {
        success: false,
        collectList: [],
      };

      return res.status(400).json(json)
    }
  }
};

module.exports = travelSampleController;
