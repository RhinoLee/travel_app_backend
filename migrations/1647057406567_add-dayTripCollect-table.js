/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  CREATE TABLE daytrip_collect(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
  `);

  pgm.sql(`
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON daytrip_collect
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
  `);
};

exports.down = pgm => {
  pgm.sql(`
  DROP TABLE daytrip_collect
  `)
};
