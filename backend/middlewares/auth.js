const jwt = require("jsonwebtoken");

async function authorizeToken(req,res,next){
    const token = req.header('Authorization').split(' ')[1];
    if(!token){
        res.status(401).json({
            msg:'user not authenticated'
        });
        return;
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,id)=>{
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // console.log(id)
        req.userId = id.userId
        next();
    })
}

module.exports = authorizeToken;