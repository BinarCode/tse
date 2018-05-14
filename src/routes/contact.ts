import ContactController from '../controllers/ContactController';
import {router} from '../lib/Facades';
router.get('/sample', (req, res, next) => {
    res.json({
        data: 'test',
        message: 'Hello from express router'
    });
});

router.group({
    prefix: 'group',
    middleware: ['auth:admin,user,pml', 'session']
}, r => {
    r.get('sample', (req, res, next) => {
        res.respond({
            foo: 'Standard data from API',
        }, `Standard message from API`, 201);
    });
});

router.group({
    prefix: 'contact'
}, router => {
    router.post('', ContactController.store);
    router.get(':contactId', ContactController.getContactWithID);
    router.get('', ContactController.getContacts);
    router.post('', ContactController.store);
    router.put(':contactId', ContactController.updateContact);
    router.delete(':contactId', ContactController.deleteContact);
});
