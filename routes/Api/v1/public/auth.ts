import router from '@bootstrap/Router';
import AuthController from '@components/auth/AuthController';

router.post('/api/register', router.middleware('api'), AuthController.register);
router.post(
    '/api/verify-register',
    router.middleware('api'),
    AuthController.verifyRegister
);
router.post('/api/login', router.middleware('api'), AuthController.login);
router.post(
    '/api/forgot-password',
    router.middleware('api'),
    AuthController.sendResetPasswordEmailWithToken
);
router.post(
    '/api/reset-password',
    router.middleware('api'),
    AuthController.resetPassword
);
