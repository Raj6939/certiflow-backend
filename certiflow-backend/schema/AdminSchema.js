import mongoose from "mongoose";
const Schema = mongoose.Schema
const TeammateSchema = new Schema({
    name: {
        type: String,
        required: true
    },    
    emailId: {
        type: String,
        required: true
    },
    adminDID: {
        type: String,
        required:false
    },
    status: {
        type: String,
        required:false
    },
    isAdminRole: {
        type:Boolean,
        required:false
    }
}, { timestamps: true })

const TeamMate = mongoose.model("TeamMate", TeammateSchema);
export default TeamMate;