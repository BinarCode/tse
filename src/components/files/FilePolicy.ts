import { UserModel } from '@components/users';
import { FileModel } from '@components/files';

const FilePolicy = {
    async access(user: UserModel, file: FileModel) {
        return true;
    },
};

export default FilePolicy;
