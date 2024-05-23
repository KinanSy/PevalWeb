'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Student', 
    [
      {
        "stuFirstname": "Nathalie",
        "stuLastname": "Moulin",
        "stuToken": "si42NpBA5UovuIKYXbZylldFb"
      },
      {
        "stuFirstname": "Marie",
        "stuLastname": "Blanc",
        "stuToken": "swPxiEtzF3mvIERIH7ntEpHt0"
      },
      {
        "stuFirstname": "Nathalie",
        "stuLastname": "Dubois",
        "stuToken": "wuD7Ny6BZB0fKQuQma4OShFfH"
      },
      {
        "stuFirstname": "Élise",
        "stuLastname": "Durand",
        "stuToken": "PrfueWbHq3P5Y5H2cSKrnvAYT"
      },
      {
        "stuFirstname": "Hélène",
        "stuLastname": "Durand",
        "stuToken": "gw3g5fS3Ts7o1cd8tSIYc6Kwd"
      },
      {
        "stuFirstname": "François",
        "stuLastname": "Chevalier",
        "stuToken": "hHnAEQyw1H7v9pjp9pZGeY9IO"
      },
      {
        "stuFirstname": "Nathalie",
        "stuLastname": "Mercier",
        "stuToken": "XIYpEBGhmzEoy3ajkAvgderU2"
      },
      {
        "stuFirstname": "Camille",
        "stuLastname": "Gauthier",
        "stuToken": "C6Dd9zHCbR5ztc4lW0nKCjeSt"
      },
      {
        "stuFirstname": "Hélène",
        "stuLastname": "Bernard",
        "stuToken": "9FdDutQUCGztqTmkriUhllMCX"
      },
      {
        "stuFirstname": "Marie",
        "stuLastname": "Chevalier",
        "stuToken": "tS5LIZmafUaTksgH1hCiG2VkV"
      },
      {
        "stuFirstname": "Philippe",
        "stuLastname": "Rousseau",
        "stuToken": "OrUjnPmHb22urnM1janfQPTjJ"
      },
      {
        "stuFirstname": "Sophie",
        "stuLastname": "Robin",
        "stuToken": "cTMk0bV4SysndFxrKgGtcUS6R"
      },
      {
        "stuFirstname": "Chantal",
        "stuLastname": "Robin",
        "stuToken": "dzmDWH3ciqnahUSxstY47T3vo"
      },
      {
        "stuFirstname": "Marie",
        "stuLastname": "Petit",
        "stuToken": "2hJ2uRnbIkA0xVT6t3y2vWFuP"
      },
      {
        "stuFirstname": "Julien",
        "stuLastname": "Moulin",
        "stuToken": "1Rf6IT7sPeAAC8xydR5XKHGVx"
      },
      {
        "stuFirstname": "Nathalie",
        "stuLastname": "Renaud",
        "stuToken": "MP9ezzO60t6LCBQbb3syarRVF"
      },
      {
        "stuFirstname": "Chantal",
        "stuLastname": "Dubois",
        "stuToken": "7Ho3Ij5KdJtl31A5vS8wehs2m"
      },
      {
        "stuFirstname": "Camille",
        "stuLastname": "Garnier",
        "stuToken": "OUCiC0bS2Cj8qS5JkfGiutqZg"
      },
      {
        "stuFirstname": "Céline",
        "stuLastname": "Mercier",
        "stuToken": "xYinSce06OgQtQYeEWOEe8uK2"
      },
      {
        "stuFirstname": "Louis",
        "stuLastname": "Renaud",
        "stuToken": "dZmaNbucED4k14O3q4Tuy2ZqR"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Student', null, {});
  }
};
