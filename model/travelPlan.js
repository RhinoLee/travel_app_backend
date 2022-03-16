const db = require("../db");

const travelPlanModel = {
  getAllPlan: async () => {
    const query = {
      text: "SELECT * FROM travel_plan ORDER BY start_date",
    };

    try {
      const result = await db.query(query);
      return result;
    } catch (err) {
      return err;
    }
  },
  getPlan: async (travelId) => {
    const query = {
      text: "SELECT * FROM travel_plan WHERE id = $1",
      values: [travelId]
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err
    }
  },
  createPlan: async ({ name, intro, description, start_date, end_date, timezone }) => {
    const query = {
      text: `INSERT INTO 
            travel_plan(name, intro, description, start_date, end_date, timezone) 
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [name, intro, description, start_date, end_date, timezone],
    };

    try {
      const result = await db.query(query);
      return result;
    } catch (err) {
      return err;
    }
  },
  deletePlan: async (travelId) => {
    const query = {
      text: "DELETE FROM travel_plan WHERE id = $1 RETURNING id",
      values: [travelId],
    };

    try {
      const result = await db.query(query);
      return result.rowCount;
    } catch (err) {
      return err;
    }
  },
};

module.exports = travelPlanModel;
