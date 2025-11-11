'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {Poppins, Roboto, Changa_One} from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

const changaOne = Changa_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-changa-one',
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  
  
  const images = [
    {
      src: '/The_Albany1.png',
      alt: 'Carousel Image 1',
      title: 'Luxurious Condominium Near Forbes Park',
      subtitle: 'What to live in a New-York Inspired Apartment.'
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
      subtitle: 'Nuvali is the Ideal Home in South'
    }
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000) // Change image every 5 seconds

    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval)
  }, []) // Empty dependency array to run only once on mount

  return (
    <main className={`${roboto.className} flex-1`}>
      {/* Hero Section with Carousel */}
      <section className="h-[70vh] relative overflow-hidden">
        {/* Carousel Container with all images */}
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
              <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover opacity-80"
              priority={index === 0}
              />
              </div>
            ))}
            </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-transparent z-10"></div>
        
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImage === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center pt-20">
            <h1 className={`${changaOne.className} text-5xl md:text-6xl font-bold mb-6 text-white`}>
              AGENTS. TOURS. LOANS. HOMES.
            </h1>
            
            {/* Desktop Search */}
            <div className="mx-auto max-w-md flex rounded overflow-hidden border border-gray-300">
              <input 
                type="text" 
                placeholder="Search..." 
                className="flex-1 bg-white px-4 py-4 text-gray-800 focus:outline-none" 
              />
              <button 
                type="button" 
                aria-label="Search" 
                className="bg-white text-black px-4 py-5 flex items-center justify-center hover:bg-gray-200 shrink-0 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-10 bottom-0 pb-8">
            <p className="text-white text-lg font-semibold">{images[currentImage].title}</p>
            <p className="text-white/90 mt-2">{images[currentImage].subtitle}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container text-black mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Stay ahead with cutting-edge solutions designed for the future.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Reliability</h3>
              <p className="text-gray-600">
                Trust in our proven track record of delivering results.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <p className="text-gray-600">
                24/7 dedicated support to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of satisfied customers who trust our services
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Contact Us
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}