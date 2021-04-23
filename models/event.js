"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		static associate(models) {
			Event.belongsTo(models.User, {
				as: "created",
				foreignKey: "createdBy",
			});
			// Event.hasMany(models.Participant, {
			// 	foreignKey: "eventId",
			// 	as: "participants",
			// });
			Event.belongsToMany(models.User, {
				as: "participant",
				through: "participants",
			});
		}
	}
	Event.init(
		{
			title: DataTypes.STRING,
			date: DataTypes.DATE,
			note: DataTypes.STRING,
			createdBy: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Event",
		}
	);
	return Event;
};
