/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Votes', {
        ContestantId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Inscriptions',
            key: 'id',
          },
          primaryKey: true,
        },
        VoterId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Voters',
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
  
      await queryInterface.addIndex('Votes', ['ContestantId', 'VoterId'], {
        unique: true,
      });
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Votes');
    },
  };