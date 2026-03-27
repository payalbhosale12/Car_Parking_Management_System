import axios from "axios";
import { useState, useEffect } from "react";

import PlotCards from "../components/PlotCards";

const ManageParkingLots=({userDetails})=>{
    const [parkingLotLocation, setParkingLotLocation] = useState("");
    const [parkingLotAddress, setParkingLotAddress] = useState("");
    const [totalParkingLots, setTotalParkingLots] = useState("");
    const [rate, setRate] = useState("");

    const {username, email} = userDetails || {};

    const [message, setMessage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        // Validate form fields
        if (!parkingLotLocation || !parkingLotAddress || !totalParkingLots || !rate) {
            setMessage("Please fill in all fields");
            return;
        }

        if (!email || !username) {
            setMessage("User details are missing");
            return;
        }

        try{
            const response = await axios.post('http://localhost:2025/api/parklots/registerlot',{
                email:email,
                parkingLotName: username, 
                parkingLotLocation: parkingLotLocation,
                parkingLotAddress: parkingLotAddress,
                totalLots: parseInt(totalParkingLots),
                rate: parseFloat(rate), 
            });

            setMessage(response.data.message);
            
            // Clear form on success
            setParkingLotLocation("");
            setParkingLotAddress("");
            setTotalParkingLots("");
            setRate("");

            setTimeout(()=>{
                window.location.reload();
            }, 500);

        } catch(e){
            console.error("Error submitting form:", e);
            setMessage(e.response?.data?.error || "ERROR SUBMITTING FORM");
        }
    };

    const [plotDetails, setPlotDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchParkingLots = async () => {
            if (!email) return;
            
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:2025/api/parklots/getlots', {
                    email: email,
                });
                setPlotDetails(response.data.lots || []);
            } catch (error) {
                console.error("Error fetching parking lots:", error);
                setMessage(error.response?.data?.message || "Error fetching parking lots");
            } finally {
                setLoading(false);
            }
        };

        fetchParkingLots();
    }, [email]);

    return(
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Manage Parking Lots</h1>
                
                <div className="space-y-8">
                    {/* Form Section */}
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Parking Lot</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {message && (
                            <div className={`text-center p-4 rounded-lg text-sm ${message.includes('ERROR') || message.includes('Error') 
                                ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
                                : 'bg-green-500/20 border border-green-500/30 text-green-300'
                            }`}>
                                {message}
                            </div>
                            )}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                                    Location:
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter town, city, state, country" 
                                    value={parkingLotLocation}
                                    onChange={(e)=>setParkingLotLocation(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                                    Address:
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Actual Address" 
                                    value={parkingLotAddress}
                                    onChange={(e)=>setParkingLotAddress(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                                    Total Spots:
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="Enter Total Parking Lots" 
                                    value={totalParkingLots}
                                    onChange={(e)=>setTotalParkingLots(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-2">
                                    Rate:
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="Enter hourly rate" 
                                    value={rate}
                                    onChange={(e)=>setRate(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Parking Lots Section */}
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Parking Lots</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                loading ? (
                                    <div className="col-span-full text-center text-gray-300">
                                        <p>Loading Parking Lots...</p>
                                    </div>
                                ) : plotDetails.length > 0 ? (
                                    plotDetails.map((lot)=>(
                                        <PlotCards key={lot._id || lot.id || Math.random()} plotDetails={lot} />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-300">
                                        <p>No Parking Lots Found</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageParkingLots;