/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  CREATE TABLE travel(
    id SERIAL PRIMARY KEY,
    intro VARCHAR(500),
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE travel;
  `)
};
