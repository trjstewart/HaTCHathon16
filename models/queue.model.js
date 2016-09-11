"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Queue', {
        startTime: DataTypes.INTEGER,
        location: DataTypes.JSON,
        questions: DataTypes.JSON,
    }, {
        classMethods: {
            tableName: 'Queue',
            freezeTableName: true,
        }
    });
};