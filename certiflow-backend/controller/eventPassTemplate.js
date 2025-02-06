const eventTemplate = `<html>
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
                <p class='center'><h3>Hi @@recipientName@@ </h3></p>
                <p class='colored'>
                Congratulations, This is your @@degreeType@@ @@degreeName@@ Certificate!
                </p>
                <p>Click here to download!<br></p><br>
                <a href="https://certiflow.netlify.app/#/credential/issue/?jwt=@@token@@" target="_blank" style="text-decoration:none;
            width: 150px; padding: 15px;font-weight: MEDIUM; background:teal; color: black; 
            cursor: pointer;
            font-size: 110%;">Click Here</a>
        </p>
                <br/>
                <br/>
                <p>Thanks & Regards, 
                <br />@@issuerName@@</p>
            </div>
        </body>    
        </html>`;

export default eventTemplate