"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Poppins, Roboto} from 'next/font/google'
import { usePathname } from 'next/navigation'

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

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  useEffect(() => {
    // prevent background scroll when menu is open
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [open])

  // Focus trap + Escape handling
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    if (!panel) return

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusable = Array.from(panel.querySelectorAll(focusableSelectors)) as HTMLElement[]

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    // move focus to first focusable element in the panel
    first?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }

      if (e.key === 'Tab') {
        // If no focusable elements, don't trap
        if (!first || !last) return

        if (e.shiftKey) {
          // shift + tab
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          // tab
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`${poppins.className} bg-gray-200 shadow-xl py-5`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-6">
          {/* Left: logo */}
          <div className="flex items-center space-x-4 md:ml-6">
            <Link href="/" aria-label="Home">
              <Image
                src="/Untitled-1.png"
                alt="Logo"
                width={180}
                height={160}
                priority
                className="w-auto h-20 md:h-28"
              />
            </Link>
              {/* Center / Desktop nav */}
            <nav className="hidden md:flex md:space-x-4 text-black">
              <Link href="/" className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/' ? 'border-b-2 border-black font-bold' : ''}`}>
              Home
              </Link>
              <Link href="/about" className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/about' ? 'border-b-2 border-black font-bold' : ''}`}>
              About us
              </Link>
              <Link 
                href="/buy" 
                className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/buy' ? 'border-b-2 border-black font-bold' : ''}`}
              >
                Buy
                

                
              </Link>
              <Link href="/sell" className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/sell' ? 'border-b-2 border-black font-bold' : ''}`}>Sell</Link>
              <Link href="/rent" className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/rent' ? 'border-b-2 border-black font-bold' : ''}`}>Rent</Link>
              <Link href="/contact" className={`px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/contact' ? 'border-b-2 border-black font-bold' : ''}`}>Contact Us</Link>
            </nav>
          </div>

          {/* Right: search + mobile button */}
          <div className="flex text-black items-center gap-3">
            <div>
              <Link href="/login" className="px-4 py-3 bg-black text-white rounded-4xl  hover:shadow-[0_0_20px_black] transition duration-300">
              Log in
              </Link>
            </div>

            {/* mobile menu button */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              {open ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay + sliding side panel (from right) */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden z-40`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Sliding panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg text-black font-semibold">Menu</div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded bg-gray-950 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        

          <nav className="text-black space-y-2">
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">About us</Link>
            <Link href="/buy" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Buy</Link>
            <Link href="/sell" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Sell</Link>
            <Link href="/rent" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Rent</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Contact Us</Link>
          </nav>
        </div>
      </aside>
    </header>
  )
}