'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teacher', [{
      teaFirstname: 'Helder',
      teaFirstname: 'Costa Lopes',
      teaLastname: 'Costa Lopes',
      teaUsername: 'hcs',
      teaPassword: 'test123*',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Teacher', null, {});
  }
};
