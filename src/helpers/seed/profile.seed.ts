import { RequestInfo, RequestInit } from 'node-fetch';
import ProfileService from '../../services/profile.service';
import ProfileInterface from '../../interfaces/profile.interface';
import database from '../../database';
import dotenv from 'dotenv';

dotenv.config();

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

const getApiData = async(profilesTotal: number): Promise<any> => {
    const response = await fetch(`https://randomuser.me/api/?results=${profilesTotal}`);
    const data = await response.json();
    return data.results;
}  

const getProfilesTotal = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
          
        readline.question(`Enter the total amount of profiles to create: `, (profilesTotal: number) => {
            resolve(profilesTotal);
            readline.close();
        });
    });
}

const getFriendsTotal = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
          
        readline.question(`Enter the total amount of friends connections: `, (friendsTotal: number) => {
            resolve(friendsTotal);
            readline.close();
        });
    });
}

const getProfile = (profileArray: any) => {    
    return profileArray[Math.floor(Math.random() * profileArray.length)];
}

const getFriend = (profileArray: ProfileInterface[], profile: ProfileInterface) => {    
    let friend = profileArray[Math.floor(Math.random() * profileArray.length)];
    if (friend._id === profile._id) {
        friend = getFriend(profileArray, profile);
    } 
    return friend;
}

const addProdfiles = async() => {
    const profilesTotal = await getProfilesTotal();
    const friendsTotal = await getFriendsTotal();

    await database();

    const users = await getApiData(Number(profilesTotal));
    const profileService = new ProfileService();
    
    const profiles = await Promise.all(
        users.map(async (user: any) => {
            const newProfile: ProfileInterface = {
                img: String(user.picture.medium),
                first_name: String(user.name.first),
                last_name: String(user.name.last),
                phone: String(user.phone),
                address: `${user.location.street.number} ${user.location.street.name}`,
                city: String(user.location.city),
                state: String(user.location.state),
                zipcode: String(user.location.postcode),
                available: true,
                friends: []
            }            
    
            const profileCreated = await profileService.create(newProfile);
            return profileCreated;
        })
    );

    for (let index = 0; index < Number(friendsTotal); index++) {
        const profile = getProfile(profiles);
        const friend = getFriend(profiles, profile);
        await profileService.addFriends(profile._id, [String(friend._id)]);
    }

    process.exit();
}

addProdfiles();





