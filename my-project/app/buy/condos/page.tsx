"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition'

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

export default function Lot() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  

  const properties: Property[] = [
    {
      id: 1,
      image: "/Anvaya-Cove-House-Lot-39.jpg",
      title: "Morong Bataan",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱3,500,000",
      bedrooms: "3",
      bathrooms: "2",
      area: "120 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 2,
      image: "/Kawit.jpg",
      title: "Kawit Cavite",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱5,800,000",
      bedrooms: "4",
      bathrooms: "3",
      area: "180 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 3,
      image: "/e7445f02491e0b.jpg",
      title: "Mandaluyong City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱2,200,000",
      bedrooms: "2",
      bathrooms: "2",
      area: "80 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 4,
      image: "/Valenzuela City.jpeg",
      title: "Cebu City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱4,500,000",
      bedrooms: "3",
      bathrooms: "2",
      area: "150 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 5,
      image: "/Antipolo.jpg",
      title: "Antipolo City",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱6,300,000",
      bedrooms: "4",
      bathrooms: "3",
      area: "200 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 6,
      image: "/Vigan.jpeg",
      title: "Vigan Ilocos Sur",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱8,500,000",
      bedrooms: "5",
      bathrooms: "4",
      area: "250 sqm",
      status: "Move-In-Ready"
    },
    {
      id: 7,
      image: "/Mactan.jpg",
      title: "Mactan Cebu",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱4,800,000",
      bedrooms: "3",
      bathrooms: "3",
      area: "160 sqm",
      status: "Move-In-Ready"
    },
    {
      id:8,
      image: "/Urdaneta.jpeg",
      title: "Urdaneta Pangasinan",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱4,800,000",
      bedrooms: "3",
      bathrooms: "3",
      area: "160 sqm",
      status: "Move-In-Ready"
    }
  ]

  return (
    <PageTransition>
    <div className="bg-white min-h-screen">
      {/* Hero Section - Enhanced with Modern Typography */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70 z-10" />
        
        {/* Decorative subtle gradient orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl z-10"></div>
        
        <div className="absolute inset-0 flex flex-col items-start justify-center z-20 text-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Eyebrow label */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
              Ready For Occupancy
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.1] tracking-tight">
            <span className="block text-white">
              Your Dream Home Awaits
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-gray-200 leading-relaxed font-light">
            Quality homes ready to move in now with flexible financing options. Experience comfort and convenience from day one.
          </p>
        </div>
      </section>

      {/* Properties Section - Enhanced Typography */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-linear-to-b from-gray-50 to-white">
        {/* Section Header with Modern Typography */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
              Exclusive Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Discover <span className="font-semibold text-gray-900">{properties.length}</span> premium pre-selling properties in prime locations
          </p>
          <div className="mt-6 w-24 h-1 bg-linear-to-r from-gray-700 to-gray-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {property.status}
                </div>
                
                {/* Price overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4">
                  <p className="text-white text-2xl sm:text-3xl font-bold">{property.price}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 bg-white">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {property.title}
                </h3>

                {/* Property Details - Enhanced with icons in colored backgrounds */}
                <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaBed className="text-gray-700 text-lg" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Bedrooms</p>
                      <p className="text-sm font-bold text-gray-900">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaBath className="text-gray-700 text-lg" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Bathrooms</p>
                      <p className="text-sm font-bold text-gray-900">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaRulerCombined className="text-gray-700 text-lg" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="text-sm font-bold text-gray-900">{property.area}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
                  {property.description}
                </p>

                {/* Buttons - Enhanced */}
                <div className="flex gap-2 w-full">
                  <button className="cursor-pointer flex-1 bg-black text-white font-bold py-3 px-4 rounded-xl transition duration-300 hover:shadow-[0_0_20px_black] text-sm shadow-sm hover:shadow-black-/50">
                    View Details
                  </button>
                  <button className="cursor-pointer bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm">
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
    </PageTransition>
  )
}