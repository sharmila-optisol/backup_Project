const nodemailer=require("nodemailer");

// node mailer

export let transporter = nodemailer.createTransport({
    service: "gmail" ,
    auth:{
     user:"sharmijayac@gmail.com" ,
     pass:"vmcxhzvfmbrklczy"
    }
    // TESTING
    })
    
    transporter.verify((error ,success) =>{
    if(error){
    console.log(error);
     }
    else{
      console.log("Ready for Messages");console.log("Success")       
     }
    
    })