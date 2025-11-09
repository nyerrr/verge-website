'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  { src: '/The_Albany1.png', alt: 'Albany Building', id: 0 },
  { src: '/NUVALI-PARK-35.png', alt: 'Nuvali Park', id: 1 },
  { src: '/Ayala_Parklinks2.png', alt: 'Ayala Parklinks', id: 2 },
]

export default function ImageCarousel() {
  const [displayedImages, setDisplayedImages] = useState(images)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlide()
    }, 7000) // Increased to 7 seconds to give more time to appreciate each image

    return () => clearInterval(timer)
  }, [])

  const handleSlide = useCallback((reverse: boolean = false) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // After animation completes, rotate the array
    setTimeout(() => {
      setDisplayedImages(current => rotateArray(current, reverse))
      setIsAnimating(false)
    }, 1500) // Match this with animation duration
  }, [isAnimating])

  // Navigation functions
  const nextSlide = () => handleSlide(false)
  const prevSlide = () => handleSlide(true)

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      <div className="relative w-full h-full overflow-hidden">
        {displayedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="absolute w-full h-full transform transition-all duration-1500 ease-in-out motion-reduce:transition-none will-change-transform"
            style={{
              transform: `translateX(${index * 100}%)`,
              opacity: isAnimating ? 0.9 : 1,
              transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.25, 1)'
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full z-20 hover:bg-black/50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full z-20 hover:bg-black/50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {displayedImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === 0 ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}