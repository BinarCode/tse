import { t } from 'i18next';
import sharp from 'sharp';
import BPromise from 'bluebird';
import upload from '@config/upload';
import filesystem from '@config/filesystem';
import { UploadedFile } from '@models/index';
import Exception from '@exceptions/Exception';
import { DriverNotFoundException } from '@exceptions';
import { UploadedFileInterface, Dimension } from '@src/interfaces';

class FileUploadService {
    constructor() {}

    static resize(
        uploadedFile: UploadedFileInterface,
        dimension: Dimension = 'medium'
    ) {
        return sharp(uploadedFile.data).resize(
            FileUploadService.getDimension(dimension),
            FileUploadService.getDimension(dimension),
            FileUploadService.resizeOptions
        );
    }

    static async upload(
        uploadedFile: UploadedFileInterface,
        dimension?: Dimension
    ): Promise<UploadedFile> {
        const path = `${FileUploadService.rootPath()}/${uploadedFile.name}`;
        let move = BPromise.promisify(uploadedFile.mv);
        try {
            let data = {};
            if (dimension) {
                let sharpFile = await FileUploadService.resize(
                    uploadedFile,
                    dimension
                );
                data = await sharpFile.toFile(path);
            } else {
                await move(path);
            }

            return FileUploadService.prettyUploadedFile(uploadedFile, {
                ...data,
                path,
            });
        } catch (e) {
            throw new Exception(t('Upload file exception.'), 500, e);
        }
    }

    static rootPath() {
        const config = filesystem.drivers[filesystem.driver];
        if (config) {
            return config.root;
        }

        throw new DriverNotFoundException(
            t('Driver configuration not found.', { driver: filesystem.driver })
        );
    }

    static getDimension(dimension) {
        const value = upload.dimensions[dimension];
        if (value) {
            return value;
        }

        throw new Exception(
            t('Dimension not found.', { dimension: dimension }),
            500
        );
    }

    static get resizeOptions() {
        return {
            kernel: sharp.kernel.nearest,
            background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        };
    }

    static prettyUploadedFile(uploadedFile: UploadedFileInterface, data) {
        const file = new UploadedFile(uploadedFile);

        if (typeof data === 'string') {
            file.getPublicUrl(data);
        } else {
            file.getPublicUrl(data.path).setSize(data.size);
        }

        return file;
    }
}

export default FileUploadService;
