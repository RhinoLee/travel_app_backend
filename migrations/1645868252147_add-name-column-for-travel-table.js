/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    ALTER TABLE travel
    ADD COLUMN name VARCHAR(50) NOT NULL
  `)
};

exports.down = pgm => {
  pgm.sql(`
    ALTER TABLE travel
    DROP COLUMN name
  `)
};