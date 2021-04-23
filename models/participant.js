"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Participant extends Model {
		static associate(models) {
			// Participant.belongsTo(models.Event, {
			// 	as: "event",
			// 	foreignKey: {
			// 		name: "eventId",
			// 	},
			// });
		}
	}
	Participant.init(
		{
			userId: DataTypes.INTEGER,
			eventId: DataTypes.INTEGER,
			note: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Participant",
		}
	);
	return Participant;
};
