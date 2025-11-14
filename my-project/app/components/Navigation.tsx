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
            <nav className="hidden md:flex md:space-x-4 text-black items-center">
              <Link href="/" className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${pathname === '/' ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
              </Link>
              <Link href="/about" className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${pathname === '/about' ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About us
              </Link>
              <div className="relative group">
                <button
                  className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${pathname.startsWith('/buy') ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                Buy
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                 </button>
                {/* Dropdown menu for "Buy" */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/buy/houses" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/buy/houses' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  Pre-Selling
                  </Link>
                  <Link href="/buy/condos" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/buy/condos' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  Ready for Occupancy
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button
                  className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${pathname.startsWith('/sell') ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                Sell
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                 </button>
                {/* Dropdown menu for "Sell" */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/sell/houses" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/sell/houses' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  House and Lot
                  </Link>
                  <Link href="/sell/condominium" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/sell/condominium' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  Condominium
                  </Link>
                </div>
              </div>
              
              <div className="relative group">
                <button
                  className={`px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 ${pathname.startsWith('/rent') ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                Rent
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                 </button>
                {/* Dropdown menu for "Rent" */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/rent/houses" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/rent/houses' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  Short Term
                  </Link>
                  <Link href="/rent/condos" className={`text-sm block px-4 py-2 hover:bg-gray-100 ${pathname === '/rent/condos' ? 'border-b-2 border-black font-bold text-gray-900 mx-2 pb-1' : ''}`}>
                  Long Term
                  </Link>
                </div>
              </div>
              <Link href="/contact" 
              className={`text-gray-900 px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${pathname === '/contact' ? 'border-b-2 border-black font-bold text-gray-900' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
              </Link>
            </nav>
          </div>

          {/* Right: search + mobile button */}
          <div className="flex text-black items-center gap-3">
            <div>
              <Link href="/login" className="text-md px-4 py-2 bg-black text-white rounded-4xl  hover:shadow-[0_0_20px_black] transition duration-300">
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
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-black p-2 rounded bg-gray-200 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        

          <nav className="text-black space-y-2">
            <Link href="/" onClick={() => setOpen(false)} 
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} 
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/about' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About us
            </Link>
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'buy' ? null : 'buy')}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between ${pathname.startsWith('/buy') ? 'font-bold text-gray-900 bg-gray-100' : ''}`}
              >
                <div className="flex items-center gap-2 justify-between">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                Buy
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'buy' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openDropdown === 'buy' && (  
                <div className="pl-6 space-y-1 mt-1">
                  <Link href="/buy/houses" onClick={() => setOpen(false)} 
                  className={`block px-2 py-2 rounded hover:bg-gray-100 ${pathname === '/buy/houses' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}
                  >
                  Pre-Selling
                  </Link>
                  <Link href="/buy/condos" onClick={() => setOpen(false)} 
                  className={`block px-2 py-2 rounded hover:bg-gray-100 ${pathname === '/buy/condos' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}
                  >
                  Ready for Occupancy
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'sell' ? null : 'sell')}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between ${pathname.startsWith('/sell') ? 'font-bold text-gray-900 bg-gray-100' : ''}`}
              >
                <div className="flex items-center gap-2 justify-between">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Sell
                    <svg className={`w-4 h-4 transition-transform ${openDropdown === 'sell' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

              </button>
              {openDropdown === 'sell' && (  
                <div className="pl-6 space-y-1 mt-1">
                  <Link href="/sell/houses" onClick={() => setOpen(false)} 
                  className={`block px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/sell/houses' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
                  House and Lot
                  </Link>
                  <Link href="/sell/condos" onClick={() => setOpen(false)} 
                  className={`block px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/sell/condos' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
                  Condominium
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'rent' ? null : 'rent')}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between ${pathname.startsWith('/rent') ? 'font-bold text-gray-900 bg-gray-100' : ''}`}
              >
                <div className="flex items-center gap-2 justify-between">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                Rent
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === 'rent' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openDropdown === 'rent' && (  
                <div className="pl-6 space-y-1 mt-1">
                  <Link href="/rent/houses" onClick={() => setOpen(false)} 
                  className={`block px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/rent/houses' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
                  Short Term
                  </Link>
                  <Link href="/rent/condos" onClick={() => setOpen(false)} 
                  className={`block px-3 py-2 rounded hover:bg-gray-100 ${pathname === '/rent/condos' ? 'font-bold text-gray-900 bg-gray-100' : ''}`}>
                  Long Term
                  </Link>
                </div>
              )}
            </div>
            <Link href="/contact" onClick={() => setOpen(false)} 
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            Contact Us
            </Link>
          </nav>
        </div>
      </aside>
    </header>
  )
}