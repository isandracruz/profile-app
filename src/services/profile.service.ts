import ProfileInterface from '../interfaces/profile.interface';
import Profile from '../schemas/profile.schema';

class ProfileService {
    
    async create(profile: ProfileInterface) {
        const newProfile = new Profile(profile);
        return await newProfile.save();
    }
}

export default ProfileService;