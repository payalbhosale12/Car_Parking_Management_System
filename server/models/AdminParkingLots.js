import mongoose from "mongoose";

const AdminParkingLots = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    parkingLotName: {
        type:String,
        required:true,
        trim: true,
    },
    parkingLotLocation:{
        type:String,
        required:true,
        trim:true,
    },
    parkingLotAddress:{
        type:String,
        required:true,
        trim:true,
        unique: true,
    },
    unreservedLots:{
        type:Number,
        required: true,
    },
    reservedLots:{
        type:Number,
        required: true,
    },
    rate:{
        type:Number,
        required:true,
    },
});

export default mongoose.model("AdminParkingLots", AdminParkingLots, "Admin Parking Lots");