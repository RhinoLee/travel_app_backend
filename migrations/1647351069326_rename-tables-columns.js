/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  ALTER TABLE travel
  RENAME TO travel_plan
  `)

  pgm.sql(`
  ALTER TABLE daytrip_collect
  RENAME TO travel_sample
  `)

  pgm.sql(`
  ALTER TABLE single_trip_collect
  RENAME TO location_trip_collect
  `)

  pgm.sql(`
  ALTER TABLE location_trip_collect
  RENAME COLUMN daytrip_id TO travel_sample_id
  `)

  pgm.sql(`
  ALTER TABLE location_trip_collect
  DROP CONSTRAINT fk_daytrip,
  ADD CONSTRAINT fk_travel_sample
    FOREIGN KEY(travel_sample_id)
      REFERENCES travel_sample(id)
      ON DELETE CASCADE
  `)
};

exports.down = pgm => {
  pgm.sql(`
  ALTER TABLE travel_plan
  RENAME TO travel
  `)

  pgm.sql(`
  ALTER TABLE travel_sample
  RENAME TO daytrip_collect
  `)

  pgm.sql(`
  ALTER TABLE location_trip_collect
  RENAME TO single_trip_collect
  `)

  pgm.sql(`
  ALTER TABLE single_trip_collect
  RENAME COLUMN travel_sample_id TO daytrip_id
  `)

  pgm.sql(`
  ALTER TABLE single_trip_collect
  DROP CONSTRAINT fk_travel_sample,
  ADD CONSTRAINT fk_daytrip
    FOREIGN KEY(daytrip_id)
      REFERENCES daytrip_collect(id)
      ON DELETE CASCADE
  `)
};
