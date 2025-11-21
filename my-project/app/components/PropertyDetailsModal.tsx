"use client"

import { useState } from 'react'
import Image from 'next/image'
import { 
  FaBed, FaBath, FaRulerCombined, FaParking, FaCalendar, FaBuilding, FaTimes, FaHeart, FaShare, 
  FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSwimmingPool, 
  FaDumbbell, FaShieldAlt, FaTree 
} from 'react-icons/fa'

interface PropertyDetailsProps {
  property: {
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
    features?: {
      interior?: string[]
      amenities?: string[]
      nearby?: string[]
    }
    floorLevel?: string
    parking?: string
    yearBuilt?: string
    propertyId?: string
  }
  onClose: () => void
}

export default function PropertyDetailsModal({ property, onClose }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      })
    } else {
      alert('Share link copied to clipboard!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <FaTimes className="text-gray-800 text-xl" />
          </button>

          {/* Image Gallery */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900">
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />

            {/* Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <FaChevronLeft className="text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <FaChevronRight className="text-gray-800" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'}`}
              >
                <FaHeart />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
              >
                <FaShare className="text-gray-800" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Price */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{property.title}</h1>
                  <span className="px-4 py-1 bg-black text-white rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {property.status}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{property.location}</span>
                </div>
                <p className="text-4xl font-bold text-gray-900">{property.price}</p>
                {property.propertyId && <p className="text-sm text-gray-500 mt-2">Property ID: {property.propertyId}</p>}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaBed className="text-gray-700 text-xl" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-bold text-gray-900">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaBath className="text-gray-700 text-xl" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-bold text-gray-900">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaRulerCombined className="text-gray-700 text-xl" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Floor Area</p>
                    <p className="font-bold text-gray-900">{property.area}</p>
                  </div>
                </div>
                {property.parking && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaParking className="text-gray-700 text-xl" /></div>
                    <div>
                      <p className="text-sm text-gray-500">Parking</p>
                      <p className="font-bold text-gray-900">{property.parking}</p>
                    </div>
                  </div>
                )}
                {property.floorLevel && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaBuilding className="text-gray-700 text-xl" /></div>
                    <div>
                      <p className="text-sm text-gray-500">Floor</p>
                      <p className="font-bold text-gray-900">{property.floorLevel}</p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><FaCalendar className="text-gray-700 text-xl" /></div>
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-bold text-gray-900">{property.yearBuilt}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Features & Amenities */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Features & Amenities</h2>

                {/* Interior */}
                {property.features?.interior?.length ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Interior Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.interior.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Amenities */}
                {property.features?.amenities?.length ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Building Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {property.features.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {amenity.toLowerCase().includes('pool') && <FaSwimmingPool className="text-blue-600" />}
                          {amenity.toLowerCase().includes('gym') && <FaDumbbell className="text-red-600" />}
                          {amenity.toLowerCase().includes('security') && <FaShieldAlt className="text-green-600" />}
                          {amenity.toLowerCase().includes('park') && <FaTree className="text-green-600" />}
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Nearby */}
                {property.features?.nearby?.length ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Nearby Locations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.nearby.map((location, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-700">
                          <FaMapMarkerAlt className="text-red-500 text-sm" />
                          <span>{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                    <p>Map will be displayed here</p>
                    <p className="text-sm">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                {/* Agent Card */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image src="/agent-placeholder.jpg" alt="Agent" width={80} height={80} className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Your Agent</h3>
                    <p className="text-gray-600">Licensed Real Estate Broker</p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:shadow-[0_0_20px_black] transition-all flex items-center justify-center gap-2">
                      <FaPhone />
                      Schedule Viewing
                    </button>
                    <button className="w-full py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <FaEnvelope />
                      Contact Agent
                    </button>
                    <button className="w-full py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                      💰 Calculate Mortgage
                    </button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaPhone className="text-gray-500" />
                      <span className="text-sm">+63 912 345 6789</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaEnvelope className="text-gray-500" />
                      <span className="text-sm">agent@vergerealty.com</span>
                    </div>
                  </div>
                </div>

                {/* Financing */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Financing Available</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><span className="text-blue-600">✓</span>Flexible payment terms</li>
                    <li className="flex items-start gap-2"><span className="text-blue-600">✓</span>Bank financing assistance</li>
                    <li className="flex items-start gap-2"><span className="text-blue-600">✓</span>In-house financing available</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
