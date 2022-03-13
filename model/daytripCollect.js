const db = require("../db")

const daytripCollectModel = {
  getAll: async () => {
    const query = {
      text: "SELECT id,name FROM daytrip_collect",
    }

    try {
      const result = await db.query(query)
      return result
    } catch (err) {
      return err
    }
  },
  createCollect: async (name) => {
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
  },
  getCollect: async (daytripId) => {
    const query = {
      text: `
      SELECT 
      daytrip_collect.id, daytrip_collect.name,
      start_time, end_time,
      location.name, address, category, lat, lng, is_collect
      FROM daytrip_collect
      LEFT JOIN single_trip_collect
      ON daytrip_collect.id = single_trip_collect.daytrip_id
      LEFT JOIN location
      ON single_trip_collect.location_id = location.id
      WHERE daytrip_collect.id = $1
      `,
      values: [daytripId]
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