const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async(req,res) =>{
    const {name,password,email} = req.body;
    
    if(!name || !password || !email){
        res.status(411).json({
            msg:"Please give all the necessary fields"
        });
        return;
    }
    const alreadyUser = await User.findOne({email:email});
    if(alreadyUser){
        return res.status(411).json({
            success:false,
            msg:"User exist already",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    });

    return res.status(200).json({
        success:true,
        msg:"Entry created successfully",
        data:user
    });


}


const login = async(req,res) => {
    const {email,password} = req.body;
    if(!password || !email){
        res.status(411).json({
            success:false,
            msg:"Please give all the necessary fields"
        });
        return;
    }

    const existingUser = await User.findOne({email:email});
    if(!existingUser){
        res.status(411).json({
            success:false,
            msg:"User doesnot exist please register"
        });
        return;
    }
    const valid = await bcrypt.compare(password,existingUser.password);
    if(!valid){
        res.status(411).json({
            success:false,
            msg:"password does not match"
        });
        return;
    }
    const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'5h'});

    res.status(200).json({
        success:true,
        token:token
    });
}

module.exports = {
    signup,
    login
}