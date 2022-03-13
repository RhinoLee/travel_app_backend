const db = require("../db")

const daytripCollectModel = {
  getAll: async () => {
    const query = {
      text: "SELECT name FROM daytrip_collect",
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  },
  createCollect: async(name) => {
    const query = {
      text: `INSERT INTO daytrip_collect(name) 
              VALUES($1) RETURNING *`,
      values: [name]
    }

    try {
      const result = await db.query(query)
      return result
    } catch (err) {
      return err
    }
  }
}

module.exports = daytripCollectModel