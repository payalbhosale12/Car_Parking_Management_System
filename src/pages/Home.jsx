import axios from "axios";
import { useState, useEffect } from "react";

import PlotCards from "../components/PlotCards";

const Home = () =>{
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Car Parking <span className="text-blue-400">Management</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Enterprise-grade parking solutions designed for modern businesses and urban environments.
                        </p>
                        <div className="mt-8">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <a href="/login">
                                    Get Started Today
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Parking Lots</h2>
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-6 mx-auto block">
                    <a href="/bookings">Reserve Your Spot</a>
                </button>
            </div>

            <div className="container mx-auto px-6 py-16">
                {/* Services Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Professional Services</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl hover:bg-slate-750 transition-all duration-300 group hover:border-blue-500">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Smart Reservations</h3>
                            <p className="text-gray-400 leading-relaxed">Advanced booking system with real-time slot management and automated confirmations.</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl hover:bg-slate-750 transition-all duration-300 group hover:border-blue-500">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Live Analytics</h3>
                            <p className="text-gray-400 leading-relaxed">Comprehensive dashboard with occupancy rates, revenue tracking, and predictive insights.</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl hover:bg-slate-750 transition-all duration-300 group hover:border-blue-500">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Enterprise Security</h3>
                            <p className="text-gray-400 leading-relaxed">Bank-grade encryption, PCI compliance, and multi-factor authentication protocols.</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-slate-800 border border-slate-700 p-12 rounded-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Enterprise Advantages</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">24/7 Global Support</h4>
                                <p className="text-gray-400">Round-the-clock technical assistance with dedicated account management.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Scalable Infrastructure</h4>
                                <p className="text-gray-400">Cloud-native architecture that grows with your business requirements.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">API Integration</h4>
                                <p className="text-gray-400">Seamless integration with existing systems and third-party applications.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Compliance Ready</h4>
                                <p className="text-gray-400">Built-in compliance frameworks for industry regulations and standards.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h4>
                                <p className="text-gray-400">Machine learning powered insights and predictive maintenance capabilities.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Mobile Optimization</h4>
                                <p className="text-gray-400">Cross-platform mobile applications with offline functionality support.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;