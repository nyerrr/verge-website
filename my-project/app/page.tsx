import {Poppins, Roboto} from 'next/font/google'
import Image from 'next/image'

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

export default function Home() {
  return (
    <main className={`${roboto.className} flex-1`}>
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden">
        <Image
          src="/The_Albany1.png"
          alt="Carousel Image"
          fill
          className="object-cover opacity-80 bg-linear-to-b from-black/40 to-transparent"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-transparent z-1">
        </div>
        <div className="container mx-auto px-4 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center pt-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Welcome
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover amazing possibilities with our innovative solutions
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
              Get Started
            </button>
            
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