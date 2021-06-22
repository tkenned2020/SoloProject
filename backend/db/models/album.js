'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING(256)
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};
