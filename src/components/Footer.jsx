const Footer = () =>{
    return (
        <div>
            <footer className="bg-gray-800 text-white py-8 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Car Parking System</h3>
                            <p className="text-gray-400">
                                Efficient parking management solution for modern cities.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                                <li><a href="/contactus" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                            <p className="text-gray-400">Email: abcd1234@gmail.com</p>
                            <p className="text-gray-400">Phone: +91 (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 Car Parking System. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;