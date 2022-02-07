'use strict';

const helpers = require('../utilities/helpers')
const SEED_USER = ['root', 'user1', 'user2']
const SEED_PASS = SEED_USER.map(u => helpers.hash(u))
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', SEED_USER.map((u, i) => {
      return {
        account: u,
        password: SEED_PASS[i],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }), {})
      .then(userId => {
        const firstId = Number(userId)
        return queryInterface.bulkInsert('Data',
          [firstId, firstId+1, firstId+2].map((id, i) =>
            ({
              browse: `browse-for-userId-${id}-#${i}`,
              content: `content-for-userId-${id}-#${i}`,
              media: `media-for-userId-${id}-#${i}`,
              UserId: id,
              createdAt: new Date(),
              updatedAt: new Date()
            })
          ), {})
      })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Data', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
};
