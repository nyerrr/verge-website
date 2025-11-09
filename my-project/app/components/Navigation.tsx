import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 text-black">
        <div className="flex items-center justify-between h-26">
          <div className="flex items-center">
            <Image 
              src="/Untitled-1.png"
              alt="Logo"
              width={160}
              height={160}
              priority
              className="w-auto h-28"
            />
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}