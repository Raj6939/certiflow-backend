import {Router} from 'express';
import issuerController from '../controller/issuerController/issuerController.js'
export default () => {
    const router = Router();
    router.post('/create/issuer', issuerController.createIssuerProfile);  
    router.post('/add/teammate',issuerController.addAdmin)  
    router.get('/get/allTeammate',issuerController.getAllAdmin)
    router.get('/invite/:token',issuerController.updateStatusAdminInvite)
    return router;
  };