import express from 'express';
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

import Users from '../models/UserAuthentication.js';
import Admin from '../models/AdminAuthentication.js';

dotenv.config({path:'./server/.env'});


const router = express.Router();


router.post('/register', async (req, res)=>{
    try{
        const {username, email, role, password} = req.body;

        const hashPwd = await bcrypt.hash(password, 10);

        if(role === "Admin"){
            const existAdmin = await Admin.findOne({email});
            if(existAdmin) return res.status(401).json({message: "❌ Email Already Exists"});

            const newAdmin = new Admin({username, email, password: hashPwd});
            await newAdmin.save();

            res.status(200).json({message: "✅Admin Registered Successfully"});

        } else if(role === "User"){
            const existUser = await Users.findOne({email});
            if(existUser) return res.status(401).json({message: "❌ Email already exists"});
            const newUser = new Users({username, email, role, password: hashPwd});
            await newUser.save();
            
            res.status(200).json({message: "✅ User Registered Successfully"});
        } else{
            res.status(401).json({message: "❌Invalid Role"});
        }   
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/login', async (req, res)=>{
    try{
        const {email, role, password} = req.body;

        if(role === 'User'){
            const user = await Users.findOne({email});
            if(!user) return res.status(401).json({message: "❌User not found"});

            const isUserPwdMatch = await bcrypt.compare(password, user.password);
            if(!isUserPwdMatch) return res.status(401).json({message: "❌Invalid Credentials"});

            const token = jwt.sign(
                {username: user.username, email: user.email, role: 'User'},
                process.env.SECRET_KEY,
                {expiresIn: '1h'},
            );

            res.json({
                message: "✅User Login Successfully",
                username: user.username,
                email: user.email,
                role: 'User',
                token,
            });

        } else if(role === "Admin"){
            const admin = await Admin.findOne({email});
            if(!admin) return res.status(401).json({message:"❌Admin not found"});

            const isAdminPwdMatch = await bcrypt.compare(password, admin.password);
            if(!isAdminPwdMatch) return res.status(401).json({message: "❌Invalid Credentials"});

            const token = jwt.sign(
                {username: admin.username, email: admin.email, role: 'Admin'},
                process.env.SECRET_KEY,
                {expiresIn: '1h'},
            );

            res.json({
                message: "✅Admin Login Successfully",
                username: admin.username,
                email: admin.email,
                role: 'Admin',
                token,
            });

        } else {
            if(role && role!==user.role) return res.status(401).json({message: "❌ User not found with the specified role"});
        }

    } catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get('/getdetails', async(req, res)=>{
    const token = req.headers['authorization']?.split(" ")[1];

    if(!token) return res.status(400).json({message: "❌Access Denied. Invalid format"});

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json({
            message: "Successfully get the details",
            details: decoded,
        });

    } catch(err){
        res.status(500).json({error: "Invalid Token"});
    }

});

export default router;