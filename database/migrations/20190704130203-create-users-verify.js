module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users_verifies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            type: {
                type: Sequelize.ENUM([
                    'register',
                    'password',
                    'email',
                    'other',
                ]),
                allowNull: true,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            till: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            used_at: {
                type: Sequelize.DATE,
                allowNull: true,
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
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

        return queryInterface.addIndex('users_verifies', {
            fields: ['email', 'token'],
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users_verifies');
    },
};
