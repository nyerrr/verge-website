import Image from "next/image";
import {Poppins} from 'next/font/google'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn} from 'react-icons/fa';

const poppins = Poppins({
  weight: ["400","700"],
  subsets: ["latin"],
});

export default function About() {
  return (
    <>
      {/* Hero Section - Improved responsive margins */}
      <section className="bg-[url('/buildings.jpg')] bg-cover bg-center bg-fixed h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">About Us</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nobis vel dignissimos, asperiores necessitatibus 
            velit corporis, eligendi voluptatem, quos consectetur odit 
            quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
          </p>
        </div>
      </section>

      {/* Mission Section - Improved responsive layout */}
      <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Left Column - Text */}
            <div className="flex-1 flex flex-col justify-center w-full">
              <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 text-justify leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Nobis vel dignissimos, asperiores necessitatibus 
                velit corporis, eligendi voluptatem, quos consectetur odit 
                quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="flex-1 w-full flex justify-center md:justify-end md:pr-4 lg:pr-8">
              <div className="w-full max-w-sm sm:max-w-md md:w-5/6 lg:w-4/5">
                <Image
                  src="/Untitled-1.png"
                  alt="About 2nd section image"
                  width={400}
                  height={400}
                  className="object-cover rounded-xl w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Improved responsive margins */}
      <section className="bg-[url('/buildings2.jpg')] bg-cover bg-center bg-fixed h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="flex flex-col m-auto relative z-10 text-center text-white px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">Vision</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nobis vel dignissimos, asperiores necessitatibus 
            velit corporis, eligendi voluptatem, quos consectetur odit 
            quam iste. Mollitia repellat impedit, blanditiis iste facilis sed voluptas.
          </p>
        </div>
      </section>

      {/* Newsletter Section - Improved responsive layout */}
      <section className="bg-yellow-200 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
            {/*Left Side - Text*/}
            <div className="flex-1 w-full text-center lg:text-left">
              <h1 className={`${poppins.className} font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4`}>
                Subscribe To Our Newsletter
              </h1>
              <p className={`${poppins.className} text-gray-800 mt-2 sm:mt-4 text-sm sm:text-base md:text-lg`}>
                Stay updated with the latest news and offers
              </p>   
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="placeholder:text-gray-600 rounded-2xl border py-2 sm:py-3 px-4 border-gray-500 w-full sm:max-w-xs md:max-w-md text-black text-sm sm:text-base"
                />
                <button className="bg-black text-white border-2 border-black px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-semibold transition duration-300 hover:shadow-[0_0_20px_black] whitespace-nowrap text-sm sm:text-base">
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
                className="w-32 sm:w-48 md:w-56 lg:w-72 xl:w-80 h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    
      {/* Footer Section - Improved responsive spacing */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm md:text-base">© 2022 Copyright: Verg Realty All Rights Reserved</p>
          <hr className="border-t border-gray-300 w-3/4 sm:w-2/3 md:w-1/2 mx-auto my-4 sm:my-6"></hr>
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}