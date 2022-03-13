const db = require("../db")

const locationModel = {
  getAllLocation: async () => {
    const query = {
      text: `SELECT * FROM location WHERE is_collect = $1`,
      values: ["1"]
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  },
  createLocation: async ({ name, address, category, lat, lng, is_collect }) => {
    const query = {
      text: `INSERT INTO location (name, address, category, lat, lng, is_collect)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [name, address, category, lat, lng, is_collect]
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  },
  deleteLocation: async (locationId) => {
    const query = {
      text: `DELETE FROM location WHERE id = $1`,
      values: [locationId]
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  },
}

module.exports = locationModel