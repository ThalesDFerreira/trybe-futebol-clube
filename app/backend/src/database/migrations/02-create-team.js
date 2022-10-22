module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "teams",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        team_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("teams");
  },
};
