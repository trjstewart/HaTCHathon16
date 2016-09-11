"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        nameFirst: { type: DataTypes.STRING },
        nameLast: { type: DataTypes.STRING },
        age: { type: DataTypes.INTEGER },
        gender: { type: DataTypes.STRING },
        emergencyName: { type: DataTypes.STRING },
        emergencyContact: { type: DataTypes.STRING },
        allergies: { type: DataTypes.STRING },
        familyHistory: { type: DataTypes.STRING },
        medication: { type: DataTypes.STRING },
        medicareCard: { type: DataTypes.STRING },
    });
};