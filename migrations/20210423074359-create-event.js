"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			date: {
				type: Sequelize.DATE,
			},
			note: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			createdBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Events");
	},
};
