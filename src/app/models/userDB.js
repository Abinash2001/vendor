import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.models.Users || mongoose.model('Users', UserSchema);
export default User;