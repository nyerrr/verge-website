"use client"
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBed, FaBath, FaRulerCombined, FaTshirt, FaSnowflake,FaCar,FaLock} from 'react-icons/fa'

const poppins = Poppins ({
  subsets:["latin"],
  weight:["400","700"],
  variable:"--font-poppins",
})

export default function Contact() {
  return(
    <>
    <div className="flex bg-white min-h-screen">
      <div className="w-1/2 relative ">
        <Image
        src="/buildings2.jpg"
        alt="contact"
        fill
        className="object-center "
        />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-black text-3xl font-bold">
          Get In Touch
        </h1>
        <form className="w-full max-w-lg space-y-4">
          <div>
            <label htmlFor="name" className="block text-black mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="text-black w-full border border-black bg-white rounded-full placeholder:text-black/50 py-2 px-5 focus:black"
              placeholder="Type your name here..."
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-black mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full text-black border border-black bg-white rounded-full placeholder:text-black/50 py-2 px-5 focus:black"
              placeholder="Type your email here..."
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-black mb-2 font-medium">
              Phone number <span className="text-red-600">(optional)</span>
            </label>
            <input
              type="phone"
              id="phone"
              className="w-full text-black border border-black bg-white rounded-full placeholder:text-black/50 py-2 px-5 focus:black"
              placeholder="Type your phone number here..."
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-black mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full text-black border border-black bg-white rounded-2xl placeholder:text-black/50 py-2 px-5 focus:black"
              placeholder="Type your message here"
            />
          </div>
          <button className="cursor-pointer text-white border border-black bg-black rounded-2xl py-2 px-5 transition hover:shadow-[0_0_20px_black] hover:shadow-black-/50 duration-300 hover:scale-105">
            Submit
          </button>
        </form>
      </div>
    </div>
    <section className="bg-linear-to-br from-gray-100 to-white px-4 sm:px-8 md:px-16 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-700 bg-white px-4 py-2 rounded-full mb-4">
                    Stay Updated
                  </span>
                  <h2 className={`${poppins.className} text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-4`}>
                    Subscribe To Our Newsletter
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Get exclusive updates on new properties and special offers
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="placeholder:text-black w-full max-w-md rounded-2xl border-2 border-gray-300 py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                    <button className="cursor-pointer transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 w-full sm:w-auto bg-black text-white px-8 py-3 rounded-2xl font-bold  hover:scale-105">
                      Subscribe Now
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/email.png"
                    alt="Newsletter"
                    width={400}
                    height={400}
                    className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-xl"
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
    </>
  )
}