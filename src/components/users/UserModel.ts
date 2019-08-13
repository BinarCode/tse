import { DataTypes, Model } from 'sequelize';

import sequelize from '@bootstrap/database';
import { MailableInterface } from '@src/interfaces';

/**
 * Models relations
 */
class UserModel extends Model {
    static readonly TYPE_NORMAL = 'normal';
    static readonly TYPE_PIONEER = 'pioneer';
    static readonly TYPE_PREMIUM = 'premium';
    static readonly TYPE_REFERRAL = 'referral';
    static readonly TYPE_OTHER = 'other';

    public id!: number;
    public uuid!: string;
    public email!: string;
    public locale!: string;
    public password!: string;
    public gender!: string;
    public salutation!: string;
    public fullName!: string;
    public image!: string;
    public type!: 'normal' | 'pioneer' | 'premium' | 'referall' | 'other';
    public verifiedAt!: Date;
    public lastLoginAt!: Date;
    public lastLoginIp!: string;

    public static associations: {};

    public sendNotificationEmail: (email: MailableInterface) => {};
}

UserModel.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        locale: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        salutation: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'full_name',
        },
        about: {
            type: DataTypes.STRING(160),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        verifiedAt: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'verified_at',
        },
        lastLoginAt: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'last_login_at',
        },
        lastLoginIp: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'last_login_ip',
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [],
        modelName: 'user',
    }
);

UserModel.prototype.sendNotificationEmail = async function(
    email: MailableInterface
) {
    return email.build(this.email).send();
};

export default UserModel;
