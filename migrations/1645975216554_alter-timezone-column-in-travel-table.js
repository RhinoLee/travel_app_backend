/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  UPDATE travel 
  SET timezone = 'Universal'
  WHERE timezone is NULL
  `);

  pgm.sql(`
  ALTER TABLE travel 
  ALTER COLUMN timezone SET DEFAULT 'Universal'
  `);

  pgm.sql(`
  ALTER TABLE travel 
  ALTER COLUMN timezone SET NOT NULL
  `);
};

exports.down = (pgm) => {};
