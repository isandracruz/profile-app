import ProfileInterface from '../interfaces/profile.interface';
import Profile from '../schemas/profile.schema';
import mongoose from "mongoose";

class ProfileService {
    
    async create(profile: ProfileInterface) {
        const newProfile = new Profile(profile);
        return await newProfile.save();
    }

    async addFriends(profileId: string, friends: string[]){
        const profileUpdated = await Profile.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(String(profileId))},
            {$addToSet: {"friends": {$each: friends}}},
            {new: true}
        );
        return profileUpdated;
    }
}

export default ProfileService;