const db = require("../db");

const travelModel = {
  getAllTravel: async () => {
    const query = {
      text: "SELECT * FROM travel ORDER BY start_date",
    };

    try {
      const result = await db.query(query);
      return result;
    } catch (err) {
      return err;
    }
  },
  createTravel: async ({ name, intro, description, start_date, end_date }) => {
    console.log("create travel request model", { name, intro, description, start_date, end_date });
    const query = {
      text: `INSERT INTO 
            travel(name, intro, description, start_date, end_date) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: [name, intro, description, start_date, end_date]
    }

    try {
      const result = await db.query(query)
      console.log("createTravel result", result);
      return result
    } catch(err) {
      return err
    }
  },
};

module.exports = travelModel;
