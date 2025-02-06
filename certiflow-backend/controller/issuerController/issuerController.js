import Issuer from "../../schema/issuerSchema.js";
import TeamMate from "../../schema/AdminSchema.js"
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../utils/constants.js'
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'christelle.parker17@ethereal.email',
        pass: 'v23J7angfTprraHWZd'
    }
})
const createIssuerProfile = async (req, res) => {
    console.log(req.body);
    const data = { ...req.body };
    
    // Use the correct field names from the schema
    const name = data.name;
    const emailId = data.emailId;
    const domainUrl = data.domainUrl;
    const about = data.about;
    const issuerDid = 'did:hid:testnet:zg2SBqaV2reovA27CAhTz3wbboWRGeDrrabY2i9Yic4y';

    const checkIssuer = await Issuer.find({ $or: [{ emailId: data.emailId }, { did: data.did }] });
    console.log(checkIssuer);

    if (checkIssuer == null || checkIssuer.length === 0) {
        const issuer = new Issuer({
            name,         // Use the correct field names from the schema
            emailId,
            did: issuerDid, // Use the predefined value for `did`
            domainUrl,
            about,
        });

        // Validate the 'name' field
        const validationError = issuer.validateSync();
        if (validationError) {
            console.error(validationError.message);
            res.status(400).send(validationError.message);
            return;
        }

        issuer.save()
            .then((result) => {
                console.log(result);
                res.send(result);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
            });
    } else {
        res.status(409).send("Issuer with the same emailId or did already exists.");
    }
};
const addAdmin = async (req, res) => {
    console.log(req.body);
    const data = { ...req.body };
    console.log("this is req data",data)
    // Use the correct field names from the schema
    const name = data.name;
    const emailId = data.emailId;
    const adminDID = data.issuerDID;
    const status = 'inactive'
    const filter = {name,emailId}    
    const teamMate = await TeamMate.where(filter).findOne();
    if(teamMate){
        return req.send(`${name} is already added in your Team`)
    }
    const new_teamMate = await TeamMate.create({
        name,
        emailId,
        adminDID,
        status,
        isAdminRole:true
    })
    console.log(new_teamMate)
    if(new_teamMate) {
        const id = new_teamMate._id
        const adminDID = new_teamMate.adminDID
        const teamMateName = new_teamMate.name
        const teamMateEmail = new_teamMate.emailId
        const token = jwt.sign({id,adminDID,teamMateName,teamMateEmail,tokenType:'invitation'},JWT_SECRET, {
            expiresIn:'60m',
        });       
    const mailOptions = {
        from:'rajvpatil1008@gmail.com',
        to:emailId,
        subject:`${name}, you are invited to join the Team`,
        html:`<html>
    
            <head>
                <style>
                    .colored {
                        color: blue;
                    }
            
                    #body {
                        background-color: #80808021
                        font-size: 18px;
                        border: 1px solid #80808021;
                        padding:20px;
                    }
            
            
                    .center{
                        margin: auto;
                        width: 50%;
                    }
                   .mobile {
                        display: none;
                    }
                    .web {
                        display:block;
                    } 
                  
                    .button {
            
                    }
                    
                    @media only screen and (max-device-width : 640px) {
            
                        /* Styles */
                        .mobile {
                            display: block;
                        }
                        .web {
                            display:none;
                        }
                    }
            
                    @media only screen and (max-device-width: 768px) {
            
                        /* Styles */
                        .mobile {
                            display: block;
                        }
                        .web {
                            display:none;
                        }
                    } 
                </style>
            </head>
            
            <body>
                <div id='body' class="center">
                    <p class='center'><h3>Hi ${name} </h3></p>
                    <p class='colored'>
                    You are invited to join Team!
                    </p>
                    <p>Click here to join the team!<br></p><br>
                    <a href="https://certiflow.netlify.app/#/invitation/?jwt=${token}" target="_blank" style="text-decoration:none;
                width: 150px; padding: 15px;font-weight: MEDIUM; background:teal; color: black; 
                cursor: pointer;
                font-size: 110%;">Click Here</a>
            </p>
                    <br/>
                    <br/>
                    <p>Thanks & Regards, 
                    <br />Certiflow</p>
                </div>
            </body>            
            </html>`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });
}    
    res.send(new_teamMate)    
    res.status(409).send("TeamMate with the same emailId already exists.");    
};
const getAllAdmin = async (req, res) => {
    console.log(req)
    const getData = await TeamMate.find({})
    console.log(getData)
    res.send(getData)
};
const updateStatusAdminInvite = async (req,res) => {
    try {
        console.log("request",req.params)
    const token = req.params.token
    console.log(token)
    const verify = await jwt.verify(token,JWT_SECRET)
    console.log("verify",verify)
    if(verify.tokenType === "invitation"){
        const teamMate = await TeamMate.findById({_id:verify.id});
        if(!teamMate) {
            return res.send({message:'You have been removed from team'})
        }
        if(teamMate.status === "active"){
            return res.send({message:'Your role as teammate has been already activated'})
        } else {
            await TeamMate.findByIdAndUpdate({_id:verify.id}, {status:'active'});
            return res.send({message:'Your email has been activated'})
        }
    }
    res.send(verify)
    } catch (error) {
        return res.send(error)
    }    
}
export default {
    createIssuerProfile,
    addAdmin,
    getAllAdmin,
    updateStatusAdminInvite
};
