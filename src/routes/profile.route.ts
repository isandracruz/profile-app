import {Router} from 'express';
import profileController from '../controllers/profile.controller';

const router = Router();

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:profileId', profileController.getProfile);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:profileId', profileController.updateProfile);
router.delete('/profiles/:profileId', profileController.deleteProfile);

router.post('/profiles/:profileId/friends', profileController.addFriends);
router.get('/profiles/:profileId/friends', profileController.getFriends);

export default router;