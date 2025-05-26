const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.authMiddleware = async (req, res , next) =>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json({message:"Unauthorized"})
 try {
        const decoded = jsonwebtoken.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        if(!user) return res.status(401).json({message:"Unauthorized"})
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",error})
    }
}

