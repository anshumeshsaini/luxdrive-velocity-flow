import React from "react";
import { FaLock, FaUserTie, FaClock, FaHeadset } from "react-icons/fa";
import WhyChooseSVG from '../Assests/audi.png'; // ✅ Ensure this path is correct

const WhyChooseUs = () => {
    return (
        <div className="bg-white py-16 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">

            {/* 🚗 Left: SVG Car Image */}
            <div className="w-full md:w-1/2 relative flex justify-center md:justify-start">
                <img
                    src={WhyChooseSVG}
                    alt="Why Choose Us Car"
                    className="w-[120%] md:w-[150%] h-auto object-contain -ml-20"
                />
            </div>


            {/* 📝 Right: Content */}
            <div className="w-full md:w-1/2 max-w-xl">
                <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    WHY CHOOSE US
                </button>
                <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                    We offer the best experience <br /> with our rental deals
                </h2>

                {/* ⭐ Features */}
                <div className="flex flex-col gap-6">
                    {/* 1 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
                            <FaLock />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Best price guaranteed</h3>
                            <p className="text-sm text-gray-500">
                                Find a lower price? We'll refund you 100% of the difference.
                            </p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
                            <FaUserTie />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Experience driver</h3>
                            <p className="text-sm text-gray-500">
                                Don’t have a driver? Don’t worry, we have many experienced drivers for you.
                            </p>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
                            <FaClock />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">24 hour car delivery</h3>
                            <p className="text-sm text-gray-500">
                                Book your car anytime and we will deliver it directly to you.
                            </p>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 text-xl">
                            <FaHeadset />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">24/7 technical support</h3>
                            <p className="text-sm text-gray-500">
                                Have a question? Contact Rentcars support any time when you have a problem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
