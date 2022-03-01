/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`ALTER DATABASE traveldb SET timezone TO 'UTC'`);
};

exports.down = pgm => {
  pgm.sql(`ALTER DATABASE traveldb SET timezone TO 'Asia/Taipei'`);
  
};
