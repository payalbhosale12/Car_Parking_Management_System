import express from 'express';

import AdminParkingLots from '../models/AdminParkingLots.js';

const router = express.Router();

// API: Registering Parking Lot
router.post('/registerlot', async (req, res)=>{
    try{
        const {email, parkingLotName, parkingLotLocation, parkingLotAddress, totalLots, rate} = req.body;

        // Validate required fields
        if (!email || !parkingLotName || !parkingLotLocation || !parkingLotAddress || !totalLots || !rate) {
            return res.status(400).json({error: "All fields are required"});
        }

        const newParkingLot = new AdminParkingLots({
            email, 
            parkingLotName, 
            parkingLotLocation, 
            parkingLotAddress, 
            totalLots,
            unreservedLots: totalLots, 
            reservedLots: 0,
            rate,
        });
        await newParkingLot.save();

        res.status(200).json({
            message: "✅Parking Lot Registered Successfully",
            email: newParkingLot.email,
            lotName: newParkingLot.parkingLotName,
            lotLocation: newParkingLot.parkingLotLocation,
            lotAddress: newParkingLot.parkingLotAddress,
            unreservedLots: newParkingLot.unreservedLots,
            reversedLots: newParkingLot.reversedLots,
        });

    } catch(err){
        res.status(500).json({error: "Error Registering Your Lot", details: err.message});
    }
});

// API: Getting Parking Lot details based on Email
router.post('/getlots', async (req, res)=>{
    try{
        const {email} = req.body;
        const parkingLots = await AdminParkingLots.find({ email: email });
        res.status(200).json({
            message: "Parking lots retrieved successfully",
            lots: parkingLots,
        });

    } catch(err){
        res.status(500).json({error: "Error Finding Lots"});
    }
});

// API: Searching for parking lots based on queries
router.post('/search', async (req, res)=>{
    try{
        const {q} = req.body;
        const parkingLots = await AdminParkingLots.find({parkingLotLocation: {$regex: q, $options: "i"}});

        res.status(200).json({
            message: "Successfully Retrieved the Parking Lots", 
            lots: parkingLots,
        })

    } catch(err){
        res.status(500).json({error: "Error Finding Parking Spots"});
    }
});

// API: Getting 3 random parking lot data
router.get('/doc3', async (req, res)=>{
    try{
        const results = await AdminParkingLots.aggregate([
            {$sample:{size:3}},
        ]);

        res.status(200).json({
            message: "Successfully Retrieved the 3 Documents",
            lots: results,
        });

    } catch(err){
        res.status(500).json({error: "Error Retrieving Parking Spots"});
    }
});

// API: Getting parking lot details based on the ID
router.get('/plots/:id', async (req, res)=>{
    try{
        const {id} = req.params;

        const plot = await AdminParkingLots.findById({_id:id});
        if(!plot) return res.status(400).json({message: "❌Plot with the given ID is not found"});

        res.status(200).json({
            message: "✅Successfully Fetched Plot",
            plot:plot,
        });

    } catch(err){
        res.status(500).json({error: "❌Error Finding Plot"});
    }
});

// API: Updating Reserved and Unreserved Lots
router.put('/updatelots/:id', async (req, res)=>{
    try{
        const {unreservedLots, reservedLots} = req.body;
        const {id} = req.params;

        const existPlot = await AdminParkingLots.findById(id);
        if(!existPlot) return res.status(400).json({message: "❌Plot doesn't exist"});

        const updatePlot = await AdminParkingLots.findByIdAndUpdate(id, {unreservedLots, reservedLots}, {
            new: true,
            runValidators: true,
        });

        if(!updatePlot) return res.status(400).json({message: "❌Plot not found"});

        res.status(200).json({
            message: "Successfully updated the details",
            lot: updatePlot,
        });

    } catch(err){
        res.status(500).json({error: "Error Updating Parking Lot details"});
    }
});


// Exporting the router
export default router;