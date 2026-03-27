const ContactUs = () =>{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Header Section */}
            <div className="bg-gray-800 shadow-sm border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Connect with our professional car parking system team for enterprise solutions
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-3">Send Message</h2>
                                <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                            </div>
                            
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                            Full Name
                                        </label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            className="w-full px-4 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400"
                                            placeholder="your.email@company.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                        Subject
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                                        Message
                                    </label>
                                    <textarea 
                                        rows="6"
                                        className="w-full px-4 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white placeholder-gray-400 resize-none"
                                        placeholder="Tell us about your parking system requirements..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-3">Get In Touch</h2>
                                <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="flex items-start group">
                                    <div className="bg-blue-900 text-blue-400 p-3 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-2">Office Address</h3>
                                        <p className="text-gray-300 leading-relaxed">Salt Lake, Sector V<br />Kolkata, West Bengal 700091<br />India</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start group">
                                    <div className="bg-blue-900 text-blue-400 p-3 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-2">Phone Number</h3>
                                        <p className="text-gray-300">+91 (033) 4567-8900</p>
                                        <p className="text-gray-300">+91 (033) 4567-8901</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start group">
                                    <div className="bg-blue-900 text-blue-400 p-3 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-2">Email Address</h3>
                                        <p className="text-gray-300">contact@parkingsystem.com</p>
                                        <p className="text-gray-300">support@parkingsystem.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start group">
                                    <div className="bg-blue-900 text-blue-400 p-3 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-2">Business Hours</h3>
                                        <p className="text-gray-300">Monday - Friday: 9:00 AM - 7:00 PM</p>
                                        <p className="text-gray-300">Saturday: 10:00 AM - 5:00 PM</p>
                                        <p className="text-gray-300">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Response Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Need immediate assistance? Our support team typically responds within 24 hours.
                            </p>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <p className="text-sm font-semibold">Average Response Time</p>
                                <p className="text-2xl font-bold"> 24 Hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;