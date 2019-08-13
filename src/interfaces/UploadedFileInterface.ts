interface UploadedFileInterface {
    name: string;
    data: Buffer;
    encoding: string;
    mimetype: string;
    size: number;
    tempFilePath: string;
    truncated: boolean;
    mv: (path, callback) => {};
}

export default UploadedFileInterface;
