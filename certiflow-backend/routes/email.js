import {Router} from 'express';
import transfer from '../controller/sendEmailController.js'

export default () => {
    const router = Router();
    router.post('/send/email', transfer.sendEmail);
    return router;
  };