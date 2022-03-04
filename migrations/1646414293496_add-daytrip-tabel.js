/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE daytrip(
    id SERIAL PRIMARY KEY,
    travel_id INT,
    name VARCHAR(50) NOT NULL,
    intro VARCHAR(500),
    description TEXT,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    CONSTRAINT fk_travel
      FOREIGN KEY(travel_id)
        REFERENCES travel(id)
        ON DELETE CASCADE
  )
  `);

  pgm.sql(`
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON daytrip
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE daytrip;
  `);
};
