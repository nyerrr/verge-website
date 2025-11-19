"use client"
import Image from 'next/image'
import {Poppins} from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const poppins = Poppins ({
  subsets:["latin"],
  weight:["400","700"],
  variable:"--font-poppins",
})

export default function Contact() {
  return(
    <>
    {/* Contact Section - Responsive */}
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* Image Section - Visible as separate section on lg screens and up */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen">
        <Image
          src="/buildings2.jpg"
          alt="contact"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Form Section with Background Image on Mobile */}
      <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:py-16 min-h-screen">
        {/* Background Image for Mobile/Tablet - Hidden on lg screens */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/buildings2.jpg"
            alt="contact background"
            fill
            className="object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Solid background for desktop */}
        <div className="hidden lg:block absolute inset-0 bg-gray-200"></div>

        {/* Form Content - Always on top with higher z-index */}
        <div className="relative z-10 w-full max-w-lg">
          <h1 className="text-white lg:text-black text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
            Get In Touch
          </h1>
          
          {/* Form with semi-transparent background on mobile for better readability */}
          <form className="w-full space-y-3 sm:space-y-4 bg-white/95 lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-3xl shadow-2xl lg:shadow-none backdrop-blur-sm lg:backdrop-blur-none">
            <div>
              <label htmlFor="name" className="block text-black mb-2 font-medium text-sm sm:text-base">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="text-black w-full border border-black bg-white rounded-full placeholder:text-black/50 py-2 sm:py-2.5 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your name here..."
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-black mb-2 font-medium text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full text-black border border-black bg-white rounded-full placeholder:text-black/50 py-2 sm:py-2.5 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your email here..."
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-black mb-2 font-medium text-sm sm:text-base">
                Phone number <span className="text-red-600 text-xs sm:text-sm">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full text-black border border-black bg-white rounded-full placeholder:text-black/50 py-2 sm:py-2.5 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your phone number here..."
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-black mb-2 font-medium text-sm sm:text-base">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full text-black border border-black bg-white rounded-2xl placeholder:text-black/50 py-2 sm:py-2.5 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="Type your message here"
              />
            </div>
            <button 
              type="submit"
              className="w-full cursor-pointer text-white border border-black bg-black rounded-2xl py-2.5 sm:py-3 px-5 text-sm sm:text-base transition hover:shadow-[0_0_20px_black] hover:shadow-black-/50 duration-300 hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Newsletter Section - Responsive */}
    <section className="bg-gradient-to-br from-gray-100 to-white px-4 sm:px-8 md:px-16 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 text-center lg:text-left w-full">
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-700 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              Stay Updated
            </span>
            <h2 className={`${poppins.className} text-black font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4`}>
              Subscribe To Our Newsletter
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Get exclusive updates on new properties and special offers
            </p>
            <div className="space-y-3 flex flex-col items-center lg:items-start">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="placeholder:text-black w-full max-w-md rounded-2xl border-2 border-gray-300 py-2.5 sm:py-3 px-4 sm:px-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <button className="cursor-pointer transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center w-full mt-6 lg:mt-0">
            <Image
              src="/email.png"
              alt="Newsletter"
              width={400}
              height={400}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Footer - Responsive */}
    <footer className="py-8 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 text-gray-300">
          © 2024 Copyright: <span className="font-bold text-white">Verg Realty</span> - All Rights Reserved
        </p>
        <hr className="border-t border-gray-600 w-full sm:w-3/4 md:w-1/2 mx-auto mb-4 sm:mb-6" />
        <div className="flex justify-center items-center gap-4 sm:gap-5 md:gap-7 lg:gap-9">
          <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
            <FaFacebookF size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
            <FaTwitter size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
            <FaInstagram size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 border border-white/20">
            <FaLinkedinIn size={16} className="sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}