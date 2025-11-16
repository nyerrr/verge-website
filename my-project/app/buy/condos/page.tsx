"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {Poppins, Roboto} from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn} from 'react-icons/fa';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export default function Condos() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, {passive:true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const properties = [
    {
      id:1,
      image: "/Tivoli.jpg",
      title: "Mandaluyong City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:2,
      image: "/Axis-Residences-Mandaluyong.jpg",
      title: "Makati City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:3,
      image: "/Park_Residences.jpg",
      title: "Sta.Rosa City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:4,
      image: "/San_Juan.jpg",
      title: "San Juan City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:5,
      image: "/NUVALI.jpeg",
      title: "San Pedro City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:6,
      image: "/bonifacio-high-street.PNG",
      title: "Bonifacio Global City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    },
    {
      id:7,
      image: "/cebu_IT_Park.jpg",
      title: "Cebu City",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nobis vel dignissimos, asperiores necessitatibus velit corporis, 
              eligendi voluptatem, quos consectetur odit quam iste. 
              Mollitia repellat impedit, blanditiis iste facilis sed voluptas.`
    }
  ]

  return (
    <div className="bg-white min-h-screen relative">

      {/* Top background image with overflow-hidden */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)` // Parallax effect
          }}
        >
          <Image
            src="/buildings2.jpg"
            alt="buildings"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center z-20 text-white px-8 md:px-16 lg:px-24">
          <p className="text-2xl font-semibold mb-4">Pre-Selling Properties</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-lg">
            Exclusive pre-selling properties with flexible payment terms and unbeatable deals
          </p>
        </div>
      </section>

      {/* Properties content */}
      <div className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-black mb-12 text-center">
          Featured Properties
        </h2>

        {/* Grid of properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Text Description - Inside the card box */}
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-black mb-3">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {property.description}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <section className="bg-yellow-200 mx-auto px-4 sm:px-8 lg:px-16 py-8 border border-gray-300 p-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
                  {/*Left Side - Text*/}
                  <div className="flex-1 w-full">
                    <h1 className={`${poppins.className} font-bold text-gray-800 text-4xl`}>
                      Subscribe To Our Newsletter
                    </h1>
                    <p className={`${poppins.className} text-gray-800 mt-4 text-sm`}>
                      Stay updated with the latest news and offers
                    </p>
      
                    <div className="mt-4">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="placeholder:text-gray-600 rounded-2xl border py-2 px-4 border-gray-500 w-full max-w-md text-black"
                      />
                      <button className="mt-4 bg-black text-white border-2 border-black px-6 py-2 rounded-2xl font-semibold transition duration-300 hover:shadow-[0_0_20px_black]">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  {/*Right Side - Image*/}
                  <div className="flex-1 flex justify-center lg:justify-end w-full">
                    <Image
                      src="/email.png"
                      alt="Newsletter Illustration"
                      width={500}
                      height={500}
                      className="w-48 sm:w-64 lg:w-80 lg:h-80 h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
      
            {/* Call to Action Section - Responsive */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>© 2022 Copyright: Verg Realty All Rights Reserved</p>
                  <hr className="border-t border-gray-300 w-1/2 mx-auto mb-6 mt-6"></hr>
                  <div className="flex justify-center items-center">
                    <a href="#" className="hover:text-blue-600 transition-colors">
                      <FaFacebookF size={24} />
                    </a>
                    <a href="#" className="mx-6 hover:text-pink-500 transition-colors">
                      <FaTwitter size={24}/>
                    </a>
                    <a href="#" className="hover:text-purple-600 transition-colors">
                      <FaInstagram size={24}/>
                    </a>
                    <a href="#" className="ml-6 hover:text-blue-700 transition-colors">
                      <FaLinkedinIn size={24}/>
                    </a>
                  </div>
              </div>
            </section>
    </div>
  )
}