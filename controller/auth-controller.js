
const jwt = require("jsonwebtoken");

const user = require("../modals/AuthModal.js");

const JWT_key = process.env.JWT_KEY;

const bcrypt = require("bcrypt");

async function signup (req,res){
  try {
    const newUser = new user(req.body);
    await newUser.save();


    return res.status(200).send({status:200,message:"USER created successfully"});

 
  } catch (error) {
    console.log(`Error While Calling signup API: ${error}`);
    return res.status(500).send({status:500,success:false,message:"Internal Server Error."})
  }
};

async function signin (req,res){
    try {
    const doesEmail = await user.findOne({email:req.body.email});
    
    if(!doesEmail) return res.status(203).send({status:203,message:"Invalid Input!"});

    const match = await bcrypt.compare(
      req.body.password,
      doesEmail.password
    );

    console.log(match)
    if(!match) return res.status(203).send({status:203,message:"Invalid Input!"});
    

      delete req.body.password;
      let jwtPayload = req.body;

  
      await jwt.sign({ jwtPayload }, JWT_key, (err, token) => {
        
        if (!err) {
          return res.send({
            status: 200,
            message: "Login Successful.",
            data: {  ...req.body },
            authToken: token,
          });
        }
      });
    } catch (error) {
      console.log(`Error While Calling signIn API: ${error}`);
      return res.status(500).send({status:500,success:false,message:"Internal Server Error."})
    }
  };

module.exports = {signup,signin}