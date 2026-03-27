import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path:'./server/.env'});

export const authMiddleware = (req, res, next)=>{
    const token = req.headers["authorization"]?.split(" ")[1];

    if(!token) return res.status(400).json({message: "❌Access Denied. Invalid format"});

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err){
        res.status(500).json({error: "Invalid Token"});
    }
};