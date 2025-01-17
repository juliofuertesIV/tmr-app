/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('TMRVotes', {
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        ContestantId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Inscriptions',
            key: 'id',
          },
          primaryKey: true,
        },
        ManagerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Managers',
            key: 'id',
          },
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      });
  
      await queryInterface.addIndex('TMRVotes', ['ContestantId', 'ManagerId'], {
        unique: true,
      });
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Votes');
    },
  };