const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let data = [];
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    uuid: faker.random.uuid(),
                    email: 'john.doe@binarcode.com',
                    full_name: 'John Doe',
                    about: faker.lorem.sentence(),
                    locale: 'en',
                    password: await bcrypt.hash('secret', 10),
                    verified_at: new Date(),
                },
            ],
            {}
        );

        for (let i = 2; i < 20; i++) {
            data.push({
                uuid: faker.random.uuid(),
                email: faker.internet.email(),
                about: faker.lorem.sentence(),
                full_name: `${faker.name.firstName(0)} ${faker.name.lastName(
                    0
                )}`,
                locale: 'en',
            });
        }

        return queryInterface.bulkInsert('users', data, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
