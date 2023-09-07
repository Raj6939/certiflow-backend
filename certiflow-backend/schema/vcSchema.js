import mongoose from "mongoose";
const Schema = mongoose.Schema
const credentialSchema = new Schema({
    vc: {
        type: Object,
        required: true
    },       
}, { timestamps: true })

const Credential = mongoose.model("Credential", credentialSchema);
export default Credential;