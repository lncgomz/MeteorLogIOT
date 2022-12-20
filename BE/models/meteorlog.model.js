const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const MeteorLog = sequelize.define("meteorlog", {
      deviceId: {
        type: DataTypes.STRING
      },
      temperature: {
        type: DataTypes.FLOAT
      },
      humidity: {
        type: DataTypes.FLOAT
      }
    });
  
    return MeteorLog;
  };