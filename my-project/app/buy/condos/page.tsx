"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBuilding, FaParking, FaBed, FaBath, FaCalendar } from 'react-icons/fa'

// ============================================
// TYPES
// ============================================
interface Property {
  id: number
  title: string
  price: string
  location?: string
  status: string
  bedrooms: string
  bathrooms: string
  area: string
  images?: string[]
  image: string
  description: string
  floorLevel?: string
  parking?: string
  yearBuilt?: string
  propertyId?: string
  category?: string
  type?: string
  features?: {
    interior?: string[]
    amenities?: string[]
    nearby?: string[]
  }
}

// ============================================
// SVG ICONS
// ============================================
const BedIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 640 512">
    <path d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"/>
  </svg>
)

const BathIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 512 512">
    <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z"/>
  </svg>
)

const RulerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 512 512">
    <path d="M512 192v128c0 17.67-14.33 32-32 32H32c-17.67 0-32-14.33-32-32V192c0-17.67 14.33-32 32-32h448c17.67 0 32 14.33 32 32z"/>
  </svg>
)

// ============================================
// MAIN COMPONENT
// ============================================
export default function Condo() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ============================================
  // FETCH DATA - Filter by category 'ready-for-occupancy'
  // ============================================
  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties?category=ready-for-occupancy')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch ready-for-occupancy properties:', error)
      setProperties([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // ============================================
  // RENDER PROPERTY CARD
  // ============================================
  const renderPropertyCard = (property: Property) => {
    let imagesArray: string[] = []
    
    try {
      if (Array.isArray(property.images)) {
        imagesArray = property.images
      } else if (typeof property.images === "string") {
        imagesArray = JSON.parse(property.images)
      }
    } catch {
      imagesArray = [property.image || "/property-placeholder.jpg"]
    }

    const mainImage = imagesArray[0] || property.image || "/property-placeholder.jpg"

    return (
      <article
        key={property.id}
        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
      >
        {/* Image */}
        <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            Ready For Occupancy
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4">
            <p className="text-white text-2xl sm:text-3xl font-bold">{property.price}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {property.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">{property.location || 'Location TBA'}</p>

          {/* Property Details */}
          <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                <BedIcon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Beds</p>
                <p className="text-sm font-bold text-gray-900">{property.bedrooms}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                <BathIcon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Baths</p>
                <p className="text-sm font-bold text-gray-900">{property.bathrooms}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                <RulerIcon className="w-5 h-5" />
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

          {/* Buttons */}
          <div className="flex gap-2">
            <Link href={`/properties/${property.id}`} className="flex-1">
              <button className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl transition duration-300 hover:shadow-[0_0_20px_black] hover:scale-105 text-sm shadow-sm">
                View Details
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm">
                Schedule Tour
              </button>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/buildings2.jpg"
            alt="buildings"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70 z-10" />
        
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl z-10"></div>
        
        <div className="absolute inset-0 flex flex-col items-start justify-center z-20 text-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
              Ready For Occupancy Condos
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.1] tracking-tight">
            <span className="block text-white">
              Move in Today, Save More
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-gray-200 leading-relaxed font-light">
            Secure your dream property with flexible payment terms
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-linear-to-b from-gray-50 to-white">
        <div className="text-center mb-12 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
              Exclusive Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Premium Ready For Occupancy Condos
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Discover <span className="font-semibold text-gray-900">{properties.length}</span> premium pre-selling properties
          </p>
          <div className="mt-6 w-24 h-1 bg-linear-to-r from-gray-700 to-gray-900 mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md p-8">
            <p className="text-gray-600 text-lg">No ready-for-occupancy properties available yet.</p>
            <p className="text-sm text-gray-400 mt-2">Check back soon for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {properties.map(renderPropertyCard)}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="relative bg-[url('/buildings2.jpg')] bg-cover bg-center bg-fixed py-16 sm:py-20 md:py-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Buy Ready For Occupancy?
          </h3>
          <p className="text-sm sm:text-base md:text-lg mb-10">
            Get the best deals and secure your investment early with flexible payment terms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Lower Prices", desc: "Early bird discounts and special rates" },
              { title: "Flexible Terms", desc: "Extended payment plans available" },
              { title: "Prime Units", desc: "First choice of location and floor" },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                <p className="text-lg sm:text-xl font-bold mb-2">{benefit.title}</p>
                <p className="text-xs sm:text-sm text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Property Features</h3>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Our ready-for-occupancy properties come with premium features and amenities.
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            {[
              { icon: <FaBuilding />, label: "Premium Location" },
              { icon: <FaParking />, label: "Parking Space" },
              { icon: <FaBed />, label: "Fully Furnished Options" },
              { icon: <FaBath />, label: "Modern Fixtures" },
              { icon: <FaCalendar />, label: "Flexible Payment Terms" },
              { icon: <RulerIcon />, label: "Spacious Layouts" },
            ].map((amenity, i) => (
              <li key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {amenity.icon}
                </div>
                <span className="text-sm font-medium">{amenity.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 text-center px-4">
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to Invest?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="cursor-pointer transition duration-300 hover:shadow-[0_0_20px_black] hover:scale-105 w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-semibold">
              Reserve Now
            </button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="cursor-pointer hover:scale-105 w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 transition">
              Get Brochure
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
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
  )
}