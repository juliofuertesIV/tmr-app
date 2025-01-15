'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Params', [
        {
            id: 'inscriptionIsPublic',
            name: 'Inscripción pública',
            description: 'La inscripción es pública y todo el mundo puede inscribirse.'
        },
        {
            id: 'videoIsRequired',
            name: 'Requiere vídeo',
            description: 'Se require adjuntar un vídeo de YouTube para inscribirse.'
        },
        {
            id: 'cityIsRequired',
            name: 'Requiere ciudad de origen',
            description: 'Se require especificar la ciudad de origen para inscribirse.'
        },
        {
            id: 'instagramIsRequired',
            name: 'Requiere perfil de instagram',
            description: 'Se require un perfil de Instagram para inscribirse.'
        },
        {
            id: 'hasManyItems',
            name: 'Número grande de inscripciones',
            description: 'El concurso tiene más de diez o veinte inscripciones, contamos con un gran número de ellas.'
        },
        {
            id: 'hasGenres',
            name: 'Especifica géneros musicales',
            description: 'El concurso incluye diferentes géneros musicales, se elige uno al inscribirse.'
        },
        {
            id: 'hasRanking',
            name: 'Muestra ranking público',
            description: 'El ranking se muestra públicamente en una página específica y en la cabecera de las cards.'
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('Params', null, {});
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
