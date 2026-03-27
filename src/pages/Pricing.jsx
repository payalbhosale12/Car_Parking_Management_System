const Pricing = () =>{
    return(
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight">
                            Parking Solutions
                        </h2>
                        <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                            Professional parking management solutions tailored to your business requirements
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
                        {/* Basic Plan */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="px-8 py-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Essential</h3>
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-8">Ideal for small businesses and individual professionals</p>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-slate-900">$5</span>
                                    <span className="text-lg font-medium text-slate-500 ml-2">/hour</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Standard parking allocation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">24/7 facility access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Mobile management platform</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-slate-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative">
                            <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-4 py-2 rounded-bl-lg font-bold text-sm">
                                RECOMMENDED
                            </div>
                            <div className="px-8 py-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Professional</h3>
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-blue-100 mb-8">Comprehensive solution for growing businesses</p>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">$99</span>
                                    <span className="text-lg font-medium text-blue-200 ml-2">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium">Priority reserved spaces</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium">Advanced booking system</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium">Climate-controlled facilities</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium">Monthly maintenance service</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-white text-blue-600 py-4 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                                    Choose Professional
                                </button>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="px-8 py-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise</h3>
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-slate-600 mb-8">Complete fleet and corporate parking solutions</p>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-slate-900">$299</span>
                                    <span className="text-lg font-medium text-slate-500 ml-2">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Multi-space fleet management</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Dedicated support specialist</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Flexible billing & invoicing</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700 font-medium">Real-time analytics & reporting</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-slate-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    Contact Sales Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;