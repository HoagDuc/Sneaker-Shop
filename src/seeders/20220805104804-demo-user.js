'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@google.com',
        password: 'admin@google.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '0123456789',
        address: 'Ha Noi',
        gender: 1,
        role_id: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
