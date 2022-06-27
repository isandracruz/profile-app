import {Router} from 'express';
import profileController from '../controllers/profile.controller';

const router = Router();

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:profileId', profileController.getProfile);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:profileId', profileController.updateProfile);
router.delete('/profiles/:profileId', profileController.deleteProfile);

export default router;