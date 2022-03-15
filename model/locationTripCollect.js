const db = require("../db")

const locationTripCollect = {
  createCollect: async ({location_id, daytrip_id, start_time, end_time}) => {
    const query = {
      text: `INSERT INTO location_trip_collect 
              (location_id, daytrip_id, start_time, end_time)
              VALUES($1, $2, $3, $4) RETURNING *`,
      values: [location_id, daytrip_id, start_time, end_time]
    }

    try {
      const result = await db.query(query)
      return result
    } catch (err) {
      return err
    }
  }
}

module.exports = locationTripCollect