import mongoose from "mongoose";
const Schema = mongoose.Schema
const IssuerSchema = new Schema({
    name: {
        type: String,
        required: false
    },    
    emailId: {
        type: String,
        required: false        
    },
    did: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required:false
    },
    domainUrl: {
        type: String,
        required:false
    },
    about: {
        type: String,
        required:false
    }
}, { timestamps: true })

const Issuer = mongoose.model("Issuer", IssuerSchema);
export default Issuer;