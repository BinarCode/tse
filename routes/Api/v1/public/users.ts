import router from '@bootstrap/Router';
import UserController from '@components/users/UsersController';

router.get(
    '/api/users/:uuid',
    router.middleware('api'),
    UserController.findByUuid
);
