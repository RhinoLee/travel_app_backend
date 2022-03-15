const db = require("../db")

const travelSampleModel = {
  getAll: async () => {
    const query = {
      text: "SELECT id,name FROM travel_sample",
    }

    try {
      const result = await db.query(query)
      return result
    } catch (err) {
      return err
    }
  },
  createSample: async (name) => {
    const query = {
      text: `INSERT INTO travel_sample(name) 
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
  getSample: async (sampleId) => {
    const query = {
      text: `
      SELECT 
      travel_sample.id, travel_sample.name,
      start_time, end_time,
      location.name, address, category, lat, lng, is_collect
      FROM travel_sample
      LEFT JOIN location_trip_collect
      ON travel_sample.id = location_trip_collect.travel_sample_id
      LEFT JOIN location
      ON location_trip_collect.location_id = location.id
      WHERE travel_sample.id = $1
      `,
      values: [sampleId]
    }

    try {
      const result = await db.query(query)
      return result
    } catch (err) {
      return err
    }
  }
}

module.exports = travelSampleModel