/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN start_date TYPE timestamptz
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN end_date TYPE timestamptz
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN created_at TYPE timestamptz
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN updated_at TYPE timestamptz
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN start_date TYPE timestamp
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN end_date TYPE timestamp
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN created_at TYPE timestamp
  `);
  pgm.sql(`
  ALTER TABLE travel ALTER COLUMN updated_at TYPE timestamp
  `);
};
