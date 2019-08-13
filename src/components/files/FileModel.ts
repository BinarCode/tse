import { Model, DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';
import sequelize from '@bootstrap/database';

class FileModel extends Model {
    static readonly TYPE_FILE = 'file';
    static readonly TYPE_IMAGE = 'image';

    public id!: number;
    public uuid!: string;
    public public!: boolean;
    public path!: string;
    public publicUrl!: string;
    public slug!: string;
    public name!: string;
    public mimeType!: string;
    public extension!: string;
    public sha1file!: string;
    public size!: number;
    public resized!: boolean;
    public createdBy!: number;
    public updatedBy!: number;
}

FileModel.init(
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
        type: DataTypes.ENUM({
            values: [FileModel.TYPE_FILE, FileModel.TYPE_IMAGE],
        }),
        public: {
            type: DataTypes.BOOLEAN,
        },
        path: {
            type: DataTypes.STRING(600),
        },
        publicUrl: {
            type: DataTypes.STRING(600),
            field: 'public_url',
        },
        slug: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        mimeType: {
            type: DataTypes.STRING(100),
            field: 'mime_type',
        },
        extension: {
            type: DataTypes.STRING(10),
        },
        sha1file: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER,
        },
        resized: {
            type: DataTypes.BOOLEAN,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
    },
    {
        sequelize,
        tableName: 'files',
        timestamps: true,
        underscored: true,
        indexes: [],
        modelName: 'file',
    }
);

SequelizeSlugify.slugifyModel(FileModel, {
    source: ['name'],
    slugOptions: { lower: true },
    overwrite: false,
    column: 'slug',
});

export default FileModel;
