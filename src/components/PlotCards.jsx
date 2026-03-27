import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PlotCards = ({plotDetails}) =>{

    const truncateLocation = (location, maxLength = 20) => {
        if (location.length <= maxLength) return location;
        return location.substring(0, maxLength).trim() + "...";
    };

    const token = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState(null);

    useEffect(()=>{
        const fetchUserDetails = async ()=>{
            if(token){
                const res = await axios.get('http://localhost:2025/api/auth/getdetails',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });

                const {username, email, role} = res.data.details;
                setUserDetails({username, email, role});
            }
        };
        fetchUserDetails();
    }, [token]);

    const hrefUrl = `/plots/${plotDetails._id}`;

    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <Link className="block cursor-pointer" to={userDetails?.role==='Admin' ? '':hrefUrl} target={userDetails?.role==="Admin" ? '':'_blank'}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-700 dark:to-gray-600 text-white p-4">
                    <h1 className="text-xl font-bold text-center">{plotDetails.parkingLotName} Parking Spot</h1> 
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Location:</span>
                        <span className="text-gray-800 dark:text-white font-semibold" title={plotDetails.parkingLotLocation}>
                            {truncateLocation(plotDetails.parkingLotLocation)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Vacant Spots:</span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">{plotDetails.unreservedLots}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Reserved Spots:</span>
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">{plotDetails.reservedLots}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Rate:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">${plotDetails.rate}/hr</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PlotCards;