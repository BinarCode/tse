import UploadedFileInterface from '@interfaces/UploadedFileInterface';

class UploadedFile implements UploadedFileInterface {
    static readonly TYPE_IMAGE = 'image';
    static readonly TYPE_FILE = 'file';

    name: string;
    data: Buffer;
    encoding: string;
    mimetype: string;
    size: number;
    tempFilePath: string;
    truncated: boolean;
    mv: (path, callback) => {};
    public_url: string;

    constructor(file: UploadedFileInterface) {
        this.name = file.name;
        this.data = file.data;
        this.encoding = file.encoding;
        this.mimetype = file.mimetype;
        this.size = file.size;
        this.tempFilePath = file.tempFilePath;
        this.truncated = file.truncated;
        this.mv = file.mv;
    }

    getPublicUrl(url) {
        this.public_url = url;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }
}

export default UploadedFile;
