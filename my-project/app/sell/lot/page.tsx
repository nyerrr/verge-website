"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

interface Property {
  id: number
  image: string
  title: string
  description: string
  price: string
  bedrooms: string
  bathrooms: string
  area: string
  status: string
}

export default function lot() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const properties: Property[] = [
    {
      id: 1,
      image: "/Tivoli.jpg",
      title: "Mandaluyong City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱3,500,000",
      bedrooms: "3",
      bathrooms: "2",
      area: "120 sqm",
      status: "Pre-Selling"
    },
    {
      id: 2,
      image: "/Axis-Residences-Mandaluyong.jpg",
      title: "Makati City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱5,800,000",
      bedrooms: "4",
      bathrooms: "3",
      area: "180 sqm",
      status: "Pre-Selling"
    },
    {
      id: 3,
      image: "/Park_Residences.jpg",
      title: "Sta.Rosa City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱2,200,000",
      bedrooms: "2",
      bathrooms: "2",
      area: "80 sqm",
      status: "Pre-Selling"
    },
    {
      id: 4,
      image: "/San_Juan.jpg",
      title: "San Juan City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱4,500,000",
      bedrooms: "3",
      bathrooms: "2",
      area: "150 sqm",
      status: "Pre-Selling"
    },
    {
      id: 5,
      image: "/NUVALI.jpeg",
      title: "San Pedro City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱6,300,000",
      bedrooms: "4",
      bathrooms: "3",
      area: "200 sqm",
      status: "Pre-Selling"
    },
    {
      id: 6,
      image: "/bonifacio-high-street.PNG",
      title: "Bonifacio Global City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱8,500,000",
      bedrooms: "5",
      bathrooms: "4",
      area: "250 sqm",
      status: "Pre-Selling"
    },
    {
      id: 7,
      image: "/cebu_IT_Park.jpg",
      title: "Cebu City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱4,800,000",
      bedrooms: "3",
      bathrooms: "3",
      area: "160 sqm",
      status: "Pre-Selling"
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Responsive */}
      <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/buildings2.jpg"
            alt="buildings"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 flex flex-col justify-center z-20 text-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Pre-Selling Properties
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl">
            Exclusive pre-selling properties with flexible payment terms and unbeatable deals
          </p>
        </div>
      </section>

      {/* Properties Grid - Responsive */}
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 sm:mb-10 md:mb-12 text-center">
          Featured Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                  {property.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                  {property.title}
                </h3>
                
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">
                  {property.price}
                </p>

                {/* Property Details - Responsive */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 text-gray-600 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FaBed className="text-base sm:text-lg" />
                    <span className="text-xs sm:text-sm font-medium">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FaBath className="text-base sm:text-lg" />
                    <span className="text-xs sm:text-sm font-medium">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FaRulerCombined className="text-base sm:text-lg" />
                    <span className="text-xs sm:text-sm font-medium">{property.area}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 mb-3 sm:mb-4">
                  {property.description}
                </p>

                {/* Button - Responsive */}
                <button className="w-full sm:w-auto sm:min-w-[140px] mx-auto bg-black text-white font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg hover:shadow-[0_0_20px_black] transition duration-300 text-sm sm:text-base block cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section - Responsive */}
      <section className="bg-yellow-200 px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Text Side */}
            <div className="flex-1 w-full text-center lg:text-left">
              <h2 className={`${poppins.className} font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4`}>
                Subscribe To Our Newsletter
              </h2>
              <p className={`${poppins.className} text-gray-800 text-sm sm:text-base mb-4 sm:mb-6`}>
                Stay updated with the latest news and offers
              </p>

              <div className="space-y-3 sm:space-y-4">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="placeholder:text-gray-600 rounded-2xl border py-2 sm:py-3 px-4 border-gray-500 w-full max-w-md text-sm sm:text-base text-black"
                />
                <button className="w-full sm:w-auto bg-black text-white border-2 border-black px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-semibold transition duration-300 hover:shadow-[0_0_20px_black] text-sm sm:text-base">
                  Subscribe
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
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="py-8 sm:py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
            © 2022 Copyright: Verg Realty All Rights Reserved
          </p>
          <hr className="border-t border-gray-300 w-3/4 sm:w-1/2 mx-auto mb-4 sm:mb-6" />
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <FaFacebookF size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaTwitter size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              <FaInstagram size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors">
              <FaLinkedinIn size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}