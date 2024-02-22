
const jwt = require("jsonwebtoken");

const user = require("../modals/AuthModal.js");

const JWT_key = process.env.JWT_KEY;

async function signup (req,res){
  try {
    const newUser = new user(req.body);
    await newUser.save();

    return res.status(200).send({success:true,message:"USER created successfully",user:newUser});

 
  } catch (error) {
    console.log(`Error While Calling signup API: ${error}`);
    return res.status(500).send({status:500,success:false,message:"Internal Server Error."})
  }
};

async function signin (req,res){
    try {
    //   res.send(req.body)

    console.log(req.body)

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
        } else {
          return res.status(203).send({
            status: 203,
            message: "Invalid Creds.",
            data: err,
          });
        }
      });
    } catch (error) {
      console.log(`Error While Calling signIn API: ${error}`);
      return res.status(500).send({status:500,success:false,message:"Internal Server Error."})
    }
  };

module.exports = {signup,signin}