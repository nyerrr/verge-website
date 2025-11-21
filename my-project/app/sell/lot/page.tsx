"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBed, FaBath, FaRulerCombined } from "react-icons/fa"
import PageTransition from "../../components/PageTransition"
import PropertyDetailsModal from "../../components/PropertyDetailsModal"
import { useRouter } from "next/navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
})

interface Property {
  id: number
  title: string
  price: string
  location?: string
  status: string
  bedrooms: string
  bathrooms: string
  area: string
  images?: string[]  // Optional array
  image: string      // Single main image
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
interface ModalProperty {
  id: number
  title: string
  price: string
  location: string
  status: string
  bedrooms: string
  bathrooms: string
  area: string
  images: string[]
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

export default function Lot() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<ModalProperty | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleProtectedAction = (action: string, property: Property) => {
  if (action === "view") {
    // Always allow viewing details
    setSelectedProperty({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location || "Unknown Location",
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: property.images || [property.image],
      description: property.description,
      floorLevel: property.floorLevel,
      parking: property.parking,
      yearBuilt: property.yearBuilt,
      propertyId: property.propertyId,
      features: property.features,
    })
  } else if (action === "schedule") {
    // Only allow scheduling if logged in
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    console.log("Schedule tour for:", property.title)
  }
}

  const properties: Property[] = [
    {
      id: 1,
      image: "/Anvaya-Cove-House-Lot-39.jpg",
      images: [
        "/Anvaya-Cove-House-Lot-39.jpg",
        "/Anvaya-Cove-House-Lot-39.jpg",
        "/Anvaya-Cove-House-Lot-39.jpg",
      ],
      title: "Morong Bataan",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      price: "₱3,500,000",
      location: "Morong, Bataan",
      bedrooms: "3",
      bathrooms: "2",
      area: "120 sqm",
      status: "Move-In-Ready",
      floorLevel: "Ground Floor",
      parking: "2 slots",
      yearBuilt: "2023",
      propertyId: "PROP-001",
      features: {
        interior: [
          "Fully furnished",
          "Modern kitchen",
          "Built-in wardrobes",
          "Balcony with garden view",
          "High-quality flooring",
        ],
        amenities: [
          "Swimming pool",
          "Fitness gym",
          "24/7 Security",
          "Playground",
          "Function hall",
          "Parking area",
        ],
        nearby: [
          "SM City Bataan - 5km",
          "Bataan General Hospital - 3km",
          "Schools within 2km",
          "Beach access - 1km",
        ],
      },
    },
    {
      id: 2,
      image: "/Pasig.jpg",
      title: "Pasig City",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱5,800,000",
      bedrooms: "4",
      bathrooms: "3",
      area: "180 sqm",
      status: "For Sale",
    },
    {
      id: 3,
      image: "/e7445f02491e0b.jpg",
      title: "Mandaluyong City",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vel dignissimos, asperiores necessitatibus velit corporis, eligendi voluptatem, quos consectetur odit quam iste.",
      price: "₱2,200,000",
      bedrooms: "2",
      bathrooms: "2",
      area: "80 sqm",
      status: "For Sale",
    },
    // ... add remaining properties
  ]

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
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
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl z-10"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl z-10"></div>

          <div className="absolute inset-0 flex flex-col items-start justify-center z-20 text-white px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                House and Lot
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.1] tracking-tight">
              Secure Your
              <span className="block text-white">Future Home Today</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl text-gray-200 leading-relaxed font-light">
              Affordable units at introductory prices. Lock in early and enjoy flexible
              payment terms while construction is ongoing.
            </p>
          </div>
        </section>

        {/* Properties Section */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-linear-to-b from-gray-50 to-white">
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
              Discover{" "}
              <span className="font-semibold text-gray-900">{properties.length}</span>{" "}
              premium house and lot properties in prime locations
            </p>
            <div className="mt-6 w-24 h-1 bg-linear-to-r from-gray-700 to-gray-900 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {properties.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
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
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4">
                    <p className="text-white text-2xl sm:text-3xl font-bold">{property.price}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-white">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {property.title}
                  </h3>

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

                  <div className="flex gap-2 w-full">
                    <button
  onClick={() => handleProtectedAction('view', property)}
  className="cursor-pointer flex-1 bg-black text-white font-bold py-3 px-4 rounded-xl transition duration-300 hover:shadow-[0_0_20px_black] text-sm shadow-sm hover:shadow-black-/50"
>
  View Details
</button>
                    <button className="cursor-pointer bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
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
