'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            locale: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            gender: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            salutation: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            about: {
                type: Sequelize.STRING(160),
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            type: {
                type: Sequelize.ENUM([
                    'normal',
                    'pioneer',
                    'premium',
                    'referall',
                    'other',
                ]),
                allowNull: false,
                defaultValue: 'normal',
            },
            verified_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            last_login_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            last_login_ip: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    },
};
