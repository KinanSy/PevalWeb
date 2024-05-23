'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('_module', [
      { modTitle: 'Mettre en oeuvre des équipements multimédias', modNumber: 115 },
      { modTitle: 'Implémenter les interfaces graphiques d’applications', modNumber: 120 },
      { modTitle: 'Elaborer des tâches de pilotage', modNumber: 121 },
      { modTitle: 'Automatiser des procédures à l’aide de scripts', modNumber: 122 },
      { modTitle: 'Etendre ou modifier une place de travail avec ordinateur', modNumber: 124 },
      { modTitle: 'Installer des périphériques en réseau', modNumber: 126 },
      { modTitle: 'Assurer l’exploitation de serveurs', modNumber: 127 },
      { modTitle: 'Mettre en service des composants réseaux', modNumber: 129 },
      { modTitle: 'Contrôler un réseau et mesurer ses flux', modNumber: 130 },
      { modTitle: 'Développer l’esprit d’équipe', modNumber: 213 },
      { modTitle: 'Instruire les utilisateurs sur le comportement avec des moyens informatiques', modNumber: 214 },
      { modTitle: 'Implémenter sur la base des objets (sans hérédité)', modNumber: 226 },
      { modTitle: 'Implémenter orienté objets (avec hérédité)', modNumber: 226 },
      { modTitle: 'Réaliser la partie cliente des applications Web', modNumber: 256 },
      { modTitle: 'Réaliser des pages Web interactives', modNumber: 307 },
      { modTitle: 'Analyser et programmer orienté objet avec des composants', modNumber: 318 },
      { modTitle: 'Développer et appliquer des structures de données et algorithmes', modNumber: 411 },
      { modTitle: 'Développer un logiciel avec des méthodes agiles', modNumber: 426 },
      { modTitle: 'Travailler dans le support', modNumber: 437 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('_module', null, {});
  }
};
