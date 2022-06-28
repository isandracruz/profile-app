import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    img: String, 
    first_name: String,
    last_name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    available: Boolean,
    friends: Object
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;