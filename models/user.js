"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Event, {
				foreignKey: "createdBy",
				key: "id",
				as: "event",
			});
			User.belongsToMany(models.Event, {
				through: "participants",
				as: "events",
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
