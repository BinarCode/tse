import router from '@bootstrap/Router';
import { ProfileController } from '@components/profile';

router.get('/api/me', router.middleware('api.user'), ProfileController.me);
router.post(
    '/api/change-password',
    router.middleware('api.user'),
    ProfileController.changePassword
);

router.post(
    '/api/me/update-avatar',
    router.middleware('api.user'),
    ProfileController.updateAvatar
);
