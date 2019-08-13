import router from '@bootstrap/Router';
import UsersController from '@components/users/UsersController';

router.get(
    '/api/admin/users',
    router.middleware('api.admin'),
    UsersController.index
);
router.post(
    '/api/admin/users',
    router.middleware('api.admin'),
    UsersController.store
);
router.put(
    '/api/admin/users/:id',
    router.middleware('api.admin'),
    UsersController.update
);
router.get(
    '/api/admin/users/:id',
    router.middleware('api.admin'),
    UsersController.find
);
router.delete(
    '/api/admin/users/:id',
    router.middleware('api.admin'),
    UsersController.destroy
);
