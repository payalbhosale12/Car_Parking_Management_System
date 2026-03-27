const About = () =>{
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">About Our Car Parking System</h1>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Revolutionizing parking management with smart technology and seamless user experience for modern urban environments.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-white font-bold text-xl">M</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                To provide an efficient, enterprise-grade parking management solution that reduces 
                                traffic congestion and optimizes urban space utilization through intelligent automation.
                            </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Key Features</h2>
                            </div>
                            <ul className="text-gray-300 space-y-3 text-lg">
                                <li className="flex items-center">
                                    <span className="text-emerald-400 mr-3 text-xl">◆</span>
                                    Real-time availability monitoring
                                </li>
                                <li className="flex items-center">
                                    <span className="text-emerald-400 mr-3 text-xl">◆</span>
                                    Advanced reservation system
                                </li>
                                <li className="flex items-center">
                                    <span className="text-emerald-400 mr-3 text-xl">◆</span>
                                    Enterprise payment gateway
                                </li>
                                <li className="flex items-center">
                                    <span className="text-emerald-400 mr-3 text-xl">◆</span>
                                    24/7 technical support
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-gray-600 rounded-2xl p-10 text-center">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
                            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-lg">
                            Our enterprise-grade parking management system leverages cutting-edge IoT technology, 
                            machine learning algorithms, and cloud infrastructure to deliver unparalleled parking 
                            solutions. With automated space detection, predictive analytics, and seamless integration 
                            capabilities, we're setting the industry standard for smart parking systems.
                        </p>
                        <div className="grid grid-cols-3 gap-8 mt-10">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                                <div className="text-gray-400 uppercase tracking-wide text-sm">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
                                <div className="text-gray-400 uppercase tracking-wide text-sm">Installations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                                <div className="text-gray-400 uppercase tracking-wide text-sm">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;