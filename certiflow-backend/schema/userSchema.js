import mongoose from "mongoose";
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },    
    emailId: {
        type: String,
        required: false
    },
    did: {
        type: String,
        required: false
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema);
export default User;