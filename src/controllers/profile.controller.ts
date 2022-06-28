import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ProfileInterface from "../interfaces/profile.interface";
import Profile from '../schemas/profile.schema';
import ProfileService from '../services/profile.service';

const getProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await Profile.find({});
        res.json(profiles);
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const profile = await Profile.findById(String(req.params.profileId));        
        res.json(profile);
    } catch (error) {
        res.status(404).json({
            message: "Document not found"
        });
    }
};

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const newProfile = {
            img: req.body.img,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            available: req.body.available,
            friends: req.body.friends ? req.body.friends: []
        }

        const profileService = new ProfileService();
        const profileCreated = await profileService.create(newProfile);
        res.json(profileCreated);
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const profileUpdated = await Profile.findOneAndUpdate({_id: new mongoose.Types.ObjectId(String(req.params.profileId))}, req.body, {new: true});
        res.json(profileUpdated);
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

const deleteProfile = async(req: Request, res: Response, next: NextFunction) => {
    try { 
        await Profile.deleteOne({_id: new mongoose.Types.ObjectId(String(req.params.profileId))});
        res.json({result: 'ok'});
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

const addFriends = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        if (req.params.profileId && Array.from(req.body.friends).length > 0) {            
            const profileService = new ProfileService();
            const profileUpdated = await profileService.addFriends(req.params.profileId, req.body.friends);
            res.json(profileUpdated);
        }  
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

const getFriends = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        if (req.params.profileId)  {
            const profile = await Profile.find({_id: new mongoose.Types.ObjectId(String(req.params.profileId))}, {friends: 1, _id: 0}); 
            res.json(profile[0]);
        } 
    } catch (error) {
        res.status(500).json({
            message: "Error processing request"
        });
    }
};

export default {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    addFriends,
    getFriends
}
