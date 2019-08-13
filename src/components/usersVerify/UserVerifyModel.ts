import { DataTypes, Model } from 'sequelize';
import sequelize from '@bootstrap/database';

class UserVerifyModel extends Model {
    static readonly TYPE_REGISTER = 'register';
    static readonly TYPE_EMAIL = 'email';
    static readonly TYPE_PASSWORD = 'password';
    static readonly TYPE_OTHER = 'other';

    public id!: number;
    public email!: string;
    public type!: 'register' | 'email' | 'password' | 'other';
    public token!: string;
    public till!: Date;
    public usedAt!: Date;
    public createdBy!: number;
    public updatedBy!: number;
}

UserVerifyModel.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
        },
        till: {
            type: DataTypes.DATE,
        },
        usedAt: {
            type: DataTypes.DATE,
            field: 'used_at',
        },
        type: {
            type: DataTypes.ENUM({
                values: ['register', 'password', 'email', 'other'],
            }),
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        udpatedBy: {
            type: DataTypes.INTEGER,
            field: 'updated_by',
        },
    },
    {
        sequelize,
        tableName: 'users_verifies',
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [
            {
                unique: false,
                fields: ['email', 'token'],
            },
        ],
        modelName: 'userVerify',
    }
);

export default UserVerifyModel;
