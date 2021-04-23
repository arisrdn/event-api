"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Participants", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			eventId: {
				type: Sequelize.INTEGER,
				// references: {
				// 	model: "Events",
				// 	key: "id",
				// },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			note: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("Participants");
	},
};
