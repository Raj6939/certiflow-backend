import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import certificateEmail from "../controller/certificate.js"
import eventPassTemplate from "../controller/eventPassTemplate.js"
import {CERTIFICATE_SCHEMA, UNIVERSITY_CERTIFICATE, EVENT_PASS_SCHEMA} from "../utils/constants.js"
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'retta.carroll8@ethereal.email',
        pass: 'VP8aEcd3MdsJ1hFy4S'
    }
})
const sendEmail = async(req,res) =>{        
    console.log(req.body,"in send Email")
    
    const data = { ...req.body }
    console.log("data",data)
    let vcAttributes= [ ...data.recipientDetails ]    
    for(let vc of vcAttributes){

    const date = new Date()
    vc.issuanceDate = date
    const jwtSecret = 'rajabced12'
    const token = jwt.sign({ vcAttributes:vc,tokenType: 'certificate',schemaId:data.schemaId }, jwtSecret, {
    expiresIn: '10m',
    });
    let mailOptions
    let mailTemplate    
    if(data.schemaId === CERTIFICATE_SCHEMA){
      console.log('in certificate')
        mailTemplate=certificateEmail
        console.log(mailTemplate)
        mailTemplate=mailTemplate.replace('@@recipientFullName@@',vc.recipientFullName)
        mailTemplate=mailTemplate.replace('@@degreeType@@',vc.degreeType)
        mailTemplate=mailTemplate.replace('@@degreeName@@',vc.degreeName)
        mailTemplate=mailTemplate.replace('@@token@@',token)
        mailTemplate=mailTemplate.replace('@@issuerName@@',vc.issuerName)
        mailOptions ={
        from: 'rajvpatil1008@gmail.com',
        to: vc.recipientEmail,
        subject: `${vc.degreeName} Certificate`,
        html:mailTemplate
        }   
        console.log(mailOptions)     
    }
    else if(data.schemaId === EVENT_PASS_SCHEMA){
        mailTemplate=eventPassTemplate
        mailTemplate=mailTemplate.replace('@@recipientName@@',vc.recipientName)
        mailTemplate=mailTemplate.replace('@@eventName@@',vc.eventName)
        mailTemplate=mailTemplate.replace('@@degreeName@@',vc.degreeName)
        mailTemplate=mailTemplate.replace('@@token@@',token)
        mailTemplate=mailTemplate.replace('@@issuerName@@',vc.issuerName)
        mailOptions ={
        from: 'retta.carroll8@ethereal.email',
        to: vc.recipientEmail,
        subject: `${vc.eventName} Invitation`,
        message:mailTemplate
        }        
    }
    console.log(token)
    // var mailOptions = {
    //     from: 'rajvpatil1008@gmail.com',
    //     to: vc.recipientEmail,
    //     subject: `${vc.degreeName} Certificate`,
    //     html: `<html>
    
    //     <head>
    //         <style>
    //             .colored {
    //                 color: blue;
    //             }
        
    //             #body {
    //                 background-color: #80808021
    //                 font-size: 18px;
    //                 border: 1px solid #80808021;
    //                 padding:20px;
    //             }
        
        
    //             .center{
    //                 margin: auto;
    //                 width: 50%;
    //             }
    //            .mobile {
    //                 display: none;
    //             }
    //             .web {
    //                 display:block;
    //             } 
              
    //             .button {
        
    //             }
                
    //             @media only screen and (max-device-width : 640px) {
        
    //                 /* Styles */
    //                 .mobile {
    //                     display: block;
    //                 }
    //                 .web {
    //                     display:none;
    //                 }
    //             }
        
    //             @media only screen and (max-device-width: 768px) {
        
    //                 /* Styles */
    //                 .mobile {
    //                     display: block;
    //                 }
    //                 .web {
    //                     display:none;
    //                 }
    //             } 
    //         </style>
    //     </head>
        
    //     <body>
    //         <div id='body' class="center">
    //             <p class='center'><h3>Hi ${vc.recipientFullName} </h3></p>
    //             <p class='colored'>
    //             Congratulations, This is your ${vc.degreeType} ${vc.degreeName} Certificate!
    //             </p>
    //             <p>Click here to download!<br></p><br>
    //             <a href="http://localhost:8080/#/credential/issue/?jwt=${token}" target="_blank" style="text-decoration:none;
    //         width: 150px; padding: 15px;font-weight: MEDIUM; background:teal; color: black; 
    //         cursor: pointer;
    //         font-size: 110%;">Click Here</a>
    //     </p>
    //             <br/>
    //             <br/>
    //             <p>Thanks & Regards, 
    //             <br />${vc.issuerName}</p>
    //         </div>
    //     </body>
        
    //     </html>`
    //   };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });
    

    }
    
    res.send("ok");
}
export default {
    sendEmail
}