import ProfileInterface from '../interfaces/profile.interface';
import Profile from '../schemas/profile.schema';
import mongoose from "mongoose";

class ProfileService {
    
    async create(profile: ProfileInterface) {
        const newProfile = new Profile(profile);
        return await newProfile.save();
    }

    async addFriends(profileId: string, friends: string[]){        
        const friendArray = friends.map(friend => new mongoose.Types.ObjectId(String(friend)));
        const existsFriends = await Profile.find({_id: {"$in": friendArray}});

        await Promise.all(
            existsFriends.map(async friend => {
                await Profile.findOneAndUpdate(
                    {_id: friend},
                    {$addToSet: {"friends": {$each: [new mongoose.Types.ObjectId(String(profileId))]}}},
                    {new: true}
                );
    
                await Profile.findOneAndUpdate(
                    {_id: new mongoose.Types.ObjectId(String(profileId))},
                    {$addToSet: {"friends": {$each: [friend._id]}}},
                    {new: true}
                );
            })
        );    
        
        const profileUpdated = await Profile.findById(String(profileId));
        return profileUpdated;
    }
}

export default ProfileService;