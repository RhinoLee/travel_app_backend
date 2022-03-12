/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  ALTER TABLE location
  ADD COLUMN is_collect CHAR(1) NOT NULL DEFAULT 0
  `)
};

exports.down = pgm => {
  pgm.sql(`
  ALTER TABLE location
  DROP COLUMN is_collect
  `)
};
