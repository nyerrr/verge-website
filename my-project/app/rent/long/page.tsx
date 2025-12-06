"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBed, FaBath, FaRulerCombined, FaTshirt, FaSnowflake, FaCar, FaLock } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition'
import PropertyDetailsModal from '../../components/PropertyDetailsModal'
import Link from 'next/link'

// ============================================
// FONT CONFIGURATION
// ============================================
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
})

// ============================================
// TYPES & INTERFACES
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
  features?: {
    interior?: string[]
    amenities?: string[]
    nearby?: string[]
  }
}

// Type used for modal, ensuring `images` always exists
interface ModalProperty extends Property {
  location: string
  images: string[]
}


interface AmenityItem {
  icon: React.ReactNode
  label: string
}

// ============================================
// SVG ICON COMPONENTS
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

const WifiIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 640 512">
    <path d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"/>
  </svg>
)

const UtensilsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 416 512">
    <path d="M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"/>
  </svg>
)


// MAIN COMPONENT

export default function LongTermRental() {
  
  // Replace lines 117-159 with this:

// STATE MANAGEMENT
const [scrollY, setScrollY] = useState(0)
const [selectedProperty, setSelectedProperty] = useState<ModalProperty | null>(null)
const [properties, setProperties] = useState<Property[]>([])
const [isLoading, setIsLoading] = useState(true)

// DATA FETCHING
const fetchProperties = async () => {
  try {
    const response = await fetch('/api/properties?category=long-term&type=rent')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // ✅ Extract the properties array from the response object
    setProperties(data.properties || [])
  } catch (error) {
    console.error('Failed to fetch long-term rental properties:', error)
    setProperties([])
  } finally {
    setIsLoading(false) // ✅ Stop loading
  }
}

// EFFECTS
useEffect(() => {
  fetchProperties()
}, [])

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY)
  window.addEventListener("scroll", handleScroll, { passive: true })
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

useEffect(() => {
  document.body.style.overflow = selectedProperty ? "hidden" : "auto"
  return () => {
    document.body.style.overflow = "auto"
  }
}, [selectedProperty])

 
  // HANDLERS
 
  const handleViewDetails = (property: Property) => {
    let imagesArray: string[] = []

    try {
      if (Array.isArray(property.images)) {
        imagesArray = property.images
      } else if (typeof property.images === "string") {
        imagesArray = JSON.parse(property.images)
      }
    } catch (err) {
      console.warn("Failed to parse images:", err)
      imagesArray = [property.image || "/property-placeholder.jpg"]
    }

    imagesArray = imagesArray.map((img) =>
      img.startsWith("/") || img.startsWith("http") ? img : `/${img}`
    )

    setSelectedProperty({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location || "Unknown Location",
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: imagesArray.length ? imagesArray : [property.image || "/property-placeholder.jpg"],
      description: property.description,
      floorLevel: property.floorLevel,
      parking: property.parking,
      yearBuilt: property.yearBuilt,
      propertyId: property.propertyId,
      features: property.features,
    } as ModalProperty)
  }

  
  // STATIC DATA
  
  const amenities: AmenityItem[] = [
    { icon: <WifiIcon />, label: "High-Speed Internet" },
    { icon: <UtensilsIcon />, label: "Full Kitchen" },
    { icon: <BedIcon />, label: "Fully Furnished" },
    { icon: <BathIcon />, label: "Clean Linens & Towels" },
    { icon: <FaTshirt />, label: "Laundry Facilities" },
    { icon: <FaSnowflake />, label: "Air Conditioning" },
    { icon: <FaCar />, label: "Parking Space" },
    { icon: <FaLock />, label: "24/7 Security" },
  ]

  const pricingOptions = [
    { period: "Monthly", price: "From ₱18,000 / month", desc: "Comfortable for extended stays, flexible terms" },
    { period: "Quarterly", price: "From ₱50,000 / 3 months", desc: "Better savings for medium-term leases" },
    { period: "Yearly", price: "From ₱180,000 / year", desc: "Maximize savings for a worry-free long-term stay" },
  ]

  // RENDER

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/buildings2.jpg" alt="buildings hero" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 flex flex-col justify-center z-20 text-white px-4 sm:px-8 md:px-16 lg:px-24">
            <span className="inline-block w-fit text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-200 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 mb-4">
              Long-Term Rental • Monthly Leases
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your Home for the Months Ahead
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl text-gray-200 leading-relaxed">
              Spacious and fully-furnished units designed for long-term comfort. Ideal for students, professionals, or anyone looking for a safe and convenient place to stay. Flexible monthly lease options with secure amenities and all the essentials for everyday living.
            </p>
          </div>
        </section>

        {/* Featured Rentals */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-linear-to-b from-gray-50 to-white">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-700 bg-gray-100 px-4 py-2 rounded-full mb-4">
              Long-Term Picks
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Available Units</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Choose from fully-furnished units perfect for monthly stays. <span className="font-semibold">{properties.length}</span> cozy and secure options for your long-term comfort.
            </p>
            <div className="mt-6 w-24 h-1 bg-linear-to-r from-gray-700 to-gray-900 mx-auto rounded-full" />
          </div>

          {/* Properties Grid with Loading States */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md p-8">
              <p className="text-gray-600 text-lg">No long-term rental properties available yet.</p>
              <p className="text-sm text-gray-400 mt-2">Check back soon for new listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {properties.map((property) => {
                let imagesArray: string[] = []
                if (property.images) {
                  imagesArray = Array.isArray(property.images)
                    ? property.images
                    : JSON.parse(property.images)
                }
                const mainImage = imagesArray[0] || "/property-placeholder.jpg"

                return (
                  <article
                    key={property.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="cursor-pointer relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <Image
                        src={mainImage}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold">
                        {property.status}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/85 to-transparent p-4">
                        <p className="text-white text-2xl sm:text-3xl font-bold">
                          {property.price}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">{property.location}</p>

                      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
                        {[
                          { icon: <BedIcon className="w-5 h-5" />, label: "Beds", value: property.bedrooms },
                          { icon: <BathIcon className="w-5 h-5" />, label: "Baths", value: property.bathrooms },
                          { icon: <RulerIcon className="w-5 h-5" />, label: "Area", value: property.area },
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                              {item.icon}
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">{item.label}</p>
                              <p className="text-sm font-bold text-gray-900">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{property.description}</p>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(property)}
                          className="cursor-pointer flex-1 bg-black text-white font-bold py-3 px-4 rounded-xl transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 hover:scale-105 text-sm"
                        >
                          View Details
                        </button>
                        <Link href="/contact">
                          <button className="cursor-pointer hover:scale-105 bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition text-sm">
                            Contact
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* Pricing Options */}
        <section className="relative bg-[url('/buildings2.jpg')] bg-cover bg-center bg-fixed py-16 sm:py-20 md:py-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Pricing Options
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-10">
              Transparent rates for long-term stays, billed monthly or yearly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {pricingOptions.map((option, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition"
                >
                  <p className="text-xs sm:text-sm uppercase text-gray-200 mb-2">{option.period}</p>
                  <p className="text-lg sm:text-xl font-bold mb-2">{option.price}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Inclusions & Amenities</h3>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Our long-term units come with utilities and conveniences.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
              {amenities.map((amenity, i) => (
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
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to Move In?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 hover:scale-105 cursor-pointer w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-semibold">
                Schedule a Tour
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="cursor-pointer hover:scale-105 w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 transition">
                Apply Now
              </button>
            </Link>
          </div>
        </section>

        {/* Newsletter */}
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
                    className="placeholder:text-gray-500 w-full max-w-md rounded-2xl border-2 border-gray-300 py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                  <button className="cursor-pointer transition duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 w-full sm:w-auto bg-black text-white px-8 py-3 rounded-2xl font-bold hover:scale-105">
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

        {/* Property Details Modal */}
        {selectedProperty && (
          <PropertyDetailsModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </PageTransition>
  )
}