import { useEffect, useState } from "react";
import axios from "axios";

import PlotCards from "../components/PlotCards";

const Bookings = () =>{
    const [location, setLocation] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetch4Doc = async ()=>{
            try{
                const response = await axios.get('http://localhost:2025/api/parklots/doc3');
                setResults(response.data.lots || []);

            } catch(err){
                setResults([]);
            } finally{
                setLoading(false);  
            }
        }

        fetch4Doc();
    },[]);

    useEffect(()=>{
        if(!location){
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(()=>{
            fetchResults(location);
        }, 100);

        return ()=> clearTimeout(delayDebounce);

    }, [location]);

    const fetchResults = async (searchArea)=>{
        try{
            setLoading(true);
            const response = await axios.post('http://localhost:2025/api/parklots/search', {
                q: searchArea,
            });

            setResults(response.data.lots || []);

        } catch(err){
            setResults([]);
        } finally{
            setLoading(false);  
        }
    };

    return (
        <div className="mx-auto p-6 bg-gray-900 min-h-screen">
            <div>
                {/* Search Location Section */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Search Parking Lots</h2>
                    <form>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                            Location:
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Location...Town, City, State, Country"
                            value={location}
                            onChange={(e)=>setLocation(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </form>
                </div>

                {/* Display the Results Section */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Parking Lots</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            loading ? (
                                <div className="col-span-full text-center text-gray-400 py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                    <p className="text-lg">Loading Parking Lots...</p>
                                </div>
                            ) : results.length > 0 ? (
                                results.map((lot)=>(
                                    <PlotCards key={lot._id || lot.id || Math.random()} plotDetails={lot} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-400 py-8">
                                    <div className="text-6xl mb-4">🚗</div>
                                    <p className="text-lg">No Parking Lots Found</p>
                                    <p className="text-sm text-gray-500 mt-2">Try searching for a different location</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;