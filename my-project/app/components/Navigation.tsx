"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Poppins, Roboto} from 'next/font/google'

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
    <header className={`${poppins.className} bg-gray-200 shadow-xl`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-25">
          {/* Left: logo */}
          <div className="flex items-center space-x-4 md:ml-6">
            <Link href="/" aria-label="Home">
              <Image
                src="/Untitled-1.png"
                alt="Logo"
                width={160}
                height={160}
                priority
                className="w-auto h-14 md:h-28"
              />
            </Link>
              {/* Center / Desktop nav */}
            <nav className="hidden md:flex md:space-x-4 text-black">
              <Link href="/" className="px-3 py-2 rounded hover:bg-gray-100">Home</Link>
              <Link href="/about" className="px-3 py-2 rounded hover:bg-gray-100">About us</Link>
              <Link href="/buy" className="px-3 py-2 rounded hover:bg-gray-100">Buy</Link>
              <Link href="/sell" className="px-3 py-2 rounded hover:bg-gray-100">Sell</Link>
              <Link href="/rent" className="px-3 py-2 rounded hover:bg-gray-100">Rent</Link>
              <Link href="/contact" className="px-3 py-2 rounded hover:bg-gray-100">Contact Us</Link>
            </nav>
          </div>

          {/* Right: search + mobile button */}
          <div className="flex text-black items-center gap-3">
            {/* desktop search */}
            <div className="hidden md:flex items-center border border-gray-300 rounded overflow-hidden">
              <input type="text" placeholder="Search..." className="px-3 py-2 text-gray-800 focus:outline-none" />
              <button type="button" aria-label="Search" className="bg-blue-500 text-white p-3 flex items-center justify-center hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
            <div>
              <Link href="/login" className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
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

          <div className="mb-4">
            <input type="text" placeholder="Search..." className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded" />
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