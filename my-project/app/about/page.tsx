"use client"

import Image from "next/image";
import {Poppins} from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn} from 'react-icons/fa';
import PageTransition from '../components/PageTransition'

const poppins = Poppins({
  weight: ["400","700"],
  subsets: ["latin"],
});

export default function About() {
  return (
    <>
      <PageTransition>
      {/* Hero Section - Improved responsive margins */}
      <section className="bg-[url('/buildings.jpg')] bg-cover bg-center bg-fixed h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">About Us</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nobis vel dignissimos, asperiores necessitatibus 
            velit corporis, eligendi voluptatem, quos consectetur odit 
            quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
          </p>
        </div>
      </section>

      {/* Mission Section - Improved responsive layout */}
      <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Left Column - Text */}
            <div className="flex-1 flex flex-col justify-center w-full">
              <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 text-justify leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Nobis vel dignissimos, asperiores necessitatibus 
                velit corporis, eligendi voluptatem, quos consectetur odit 
                quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="flex-1 w-full flex justify-center md:justify-end md:pr-4 lg:pr-8">
              <div className="w-full max-w-sm sm:max-w-md md:w-5/6 lg:w-4/5">
                <Image
                  src="/Untitled-1.png"
                  alt="About 2nd section image"
                  width={400}
                  height={400}
                  className="object-cover rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Improved responsive margins */}
      <section className="bg-[url('/buildings2.jpg')] bg-cover bg-center bg-fixed h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="flex flex-col m-auto relative z-10 text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Vision</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nobis vel dignissimos, asperiores necessitatibus 
            velit corporis, eligendi voluptatem, quos consectetur odit 
            quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
          </p>
        </div>
      </section>

      {/* Newsletter Section - Enhanced */}
            <section className="bg-linear-to-br from-gray-100 via-gray-50 to-white px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-14 md:py-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200/50 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-200/50 rounded-full blur-3xl"></div>
              <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Text Side */}
                <div className="flex-1 w-full text-center lg:text-left">
                  <div className="mb-4">
                    <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2">
                      Stay Updated
                    </span>
                  </div>
                  <h2 className={`${poppins.className} font-bold text-gray-900 text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight`}>
                    Subscribe To Our
                    <span className="block">
                      Newsletter
                    </span>
                  </h2>
                  <p className={`${poppins.className} text-gray-600 text-base sm:text-lg mb-6 leading-relaxed`}>
                    Get exclusive updates on new properties, special offers, and real estate insights
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="placeholder:text-gray-500 rounded-2xl border-2 border-gray-300 py-3 sm:py-4 px-5 w-full max-w-md text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all bg-white shadow-sm"
                    />
                    <button className="cursor-pointer w-full sm:w-auto bg-black text-white border-2 border-black px-8 sm:px-10 
                    py-3 sm:py-4 rounded-2xl font-bold transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 hover:scale-105 text-sm sm:text-base">
                      Subscribe Now
                    </button>
                  </div>
                </div>
                  
                {/* Image Side */}
                <div className="flex-1 flex justify-center lg:justify-end w-full">
                  <Image
                  src="/email.png"
                  alt="Newsletter Illustration"
                  width={500}
                  height={500}
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl object-cover shadow-2xl"
                  />
                </div>
                </div>
               </div>
            </section>
            
            {/* Footer - Enhanced */}
            <footer className="py-12 sm:py-14 md:py-16 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent"></div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <p className="text-sm sm:text-base md:text-lg mb-6 text-gray-300">
                  © 2024 Copyright: <span className="font-bold text-white">Verg Realty</span> - All Rights Reserved
                </p>
                <hr className="border-t border-gray-600 w-3/4 sm:w-1/2 mx-auto mb-6" />
                <div className="flex justify-center items-center gap-5 sm:gap-7 md:gap-9">
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
                </div>
              </footer>
    </PageTransition>
    </>
  )
}