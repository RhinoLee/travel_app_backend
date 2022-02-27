/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  ALTER TABLE travel 
  ADD COLUMN timezone VARCHAR(100);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE travel
  DROP COLUMN timezone
  `);
};
