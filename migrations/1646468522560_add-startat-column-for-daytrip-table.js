/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  ALTER TABLE daytrip
  ADD COLUMN start_date timestamptz NOT NULL
  `)
};

exports.down = pgm => {
  pgm.sql(`
  ALTER TABLE daytrip
  DROP COLUMN start_date
  `)
};
