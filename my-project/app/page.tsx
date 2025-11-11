'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    {
      src: '/The_Albany1.png',
      alt: 'Carousel Image 1',
      title: 'Luxurious Condominium Near Forbes Park',
      subtitle: 'Want to live in a New-York Inspired Apartment.'
    },
    {
      src: '/NUVALI-PARK-35.png', 
      alt: 'Carousel Image 2',
      title: 'This Newest Township is on the Rise',
      subtitle: 'How to live in this green and urban community.'
    },
    {
      src: '/Ayala_Parklinks2.png', 
      alt: 'Carousel Image 3',
      title: 'Nuvali is the Ideal Home in South',
      subtitle: 'Experience modern living in harmony with nature'
    }
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <main className="flex-1">
      {/* Hero Section with Carousel - Responsive Height */}
      <section className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden">
        {/* Carousel Container */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                index === currentImage
                  ? 'translate-x-0'
                  : index < currentImage
                  ? '-translate-x-full'
                  : 'translate-x-full'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/60 z-10"></div>
        
        {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
        <button
          onClick={prevImage}
          className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                currentImage === index ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-2 md:w-3'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center">
            {/* Responsive Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              AGENTS. TOURS. LOANS. HOMES.
            </h1>
            
            {/* Responsive Search Bar */}
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex rounded-xl md:rounded-2xl overflow-hidden border border-gray-300 shadow-lg">
              <input 
                type="text" 
                placeholder="Search properties..." 
                className="flex-1 bg-white px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button 
                type="button" 
                aria-label="Search" 
                className="bg-white text-black px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-center hover:bg-gray-200 shrink-0 cursor-pointer transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>

            {/* Image Title and Subtitle */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <p className="text-white text-base sm:text-lg md:text-xl font-semibold px-4">
                {images[currentImage].title}
              </p>
              <p className="text-white/90 text-sm sm:text-base mt-1 sm:mt-2 px-4">
                {images[currentImage].subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container text-black mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-left text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            Featured Cities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Innovation</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Stay ahead with cutting-edge solutions designed for the future.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Reliability</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Trust in our proven track record of delivering results.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="text-blue-600 mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                24/7 dedicated support to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who trust our services
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <button className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-sm sm:text-base w-full sm:w-auto">
              Contact Us
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-300 text-sm sm:text-base w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}