import repository from './fileRepository';
import { Dimension } from '@src/interfaces';
import mixin from '@utils/rest/serviceMixin';
import FileUploadService from '@services/FileUploadService';

const FileService = {
    ...mixin(repository),
    async store(file, dimension?: Dimension) {
        const uploadedFile = await FileUploadService.upload(file, dimension);
        let data = {
            type: 'image',
            name: uploadedFile.name,
            mimeType: uploadedFile.mimetype,
            size: uploadedFile.size,
            publicUrl: uploadedFile.public_url,
        };

        return repository.store(data);
    },
};

export default FileService;
