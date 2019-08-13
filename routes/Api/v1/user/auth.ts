import router from '@bootstrap/Router';
import AuthController from '@components/auth/AuthController';

router.get('/api/logout', router.middleware('api.user'), AuthController.logout);
