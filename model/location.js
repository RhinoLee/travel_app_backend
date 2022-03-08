const db = require("../db")

const locationModel = {
  getAllLocation: async () => {
    const query = {
      text: `SELECT * FROM location`,
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  },
  createLocation: async ({ name, address, category, lat, lng }) => {
    const query = {
      text: `INSERT INTO location (name, address, category, lat, lng)
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: [name, address, category, lat, lng]
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