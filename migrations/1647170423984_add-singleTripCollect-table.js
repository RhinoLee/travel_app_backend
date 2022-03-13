/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  CREATE TABLE single_trip_collect(
    id SERIAL PRIMARY KEY,
    location_id INT,
    daytrip_id INT,
    start_time CHAR(5),
    end_time CHAR(5),
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    CONSTRAINT 
      fk_location
        FOREIGN KEY(location_id)
          REFERENCES location(id)
          ON DELETE CASCADE,
    CONSTRAINT
      fk_daytrip
        FOREIGN KEY(daytrip_id)
          REFERENCES daytrip_collect(id)
          ON DELETE CASCADE
  )
  `)

  pgm.sql(`
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON single_trip_collect
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `);
};

exports.down = pgm => { 
  pgm.sql(`
  DROP TABLE single_trip_collect
  `)
};
