
const bcrypt = require("bcrypt");

async function passwordHash(req,res,next){
    try {

        const data = req.body || null;

        //validate input data
        if (!data  || !data.email || !data.password || !data.name) return res.status(404).send({status:404,success:false,message:"Please Fill All Fields!"});
     
    
         //hash password
         let password = data.password;
     
         let salt = await bcrypt.genSalt(10);
     
         const securePassword = await bcrypt.hash(password, salt);
     
         req.body.password = securePassword;

         next();

    } catch (error) {
        console.log(`Error while calling password hash middleware: ${error}`);
        return res.status(500).send({status:500,success:false,message:"Internal Server Error."})
    }

  
};



module.exports = {passwordHash};