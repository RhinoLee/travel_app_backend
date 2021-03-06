const db = require("../db")

const timeZoneModel = {
  getTimeZoneList: async () => {
    const query = {
      text: "SELECT name, utc_offset FROM pg_timezone_names",
    }

    try {
      const result = await db.query(query)
      return result
    } catch(err) {
      return err 
    }
  }
}

module.exports = timeZoneModel