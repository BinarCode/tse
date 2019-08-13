'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('files', {
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
            type: {
                type: Sequelize.ENUM(['file', 'image']),
                allowNull: false,
            },
            public: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            path: {
                type: Sequelize.STRING(600),
                allowNull: true,
            },
            public_url: {
                type: Sequelize.STRING(600),
                allowNull: true,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            mime_type: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            extension: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            sha1file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            size: {
                type: Sequelize.INTEGER,
            },
            resized: {
                type: Sequelize.BOOLEAN,
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('files');
    },
};
