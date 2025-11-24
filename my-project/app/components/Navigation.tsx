"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showSearchInHeader, setShowSearchInHeader] = useState(false)
  const panelRef = useRef<HTMLElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      setUser(JSON.parse(userDataStr));
    }
  }, [])

  // Check login status
  useEffect (() => {
    const userData = localStorage.getItem('userData')
      if (userData) {
        const user = JSON.parse(userData)
        setIsLoggedIn (true)
        setUserName (user.name)
      }
  }, [])

  //Logout
  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    setIsLoggedIn (false)
    setUserName('')
    window.location.href = '/login'
    setOpen(false)
  }
  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus trap and Escape key handling for mobile menu
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    if (!panel) return

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusable = Array.from(panel.querySelectorAll(focusableSelectors)) as HTMLElement[]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }

      if (e.key === 'Tab' && first && last) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const navItems = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: 'About us', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  const dropdownMenus = {
    buy: {
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      label: 'Buy',
      items: [
        { href: '/buy/houses', label: 'Pre-Selling' },
        { href: '/buy/condos', label: 'Ready for Occupancy' },
      ]
    },
    sell: {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'Sell',
      items: [
        { href: '/sell/lot', label: 'House and Lot' },
        { href: '/sell/condominium', label: 'Condominium' },
      ]
    },
    rent: {
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
      label: 'Rent',
      items: [
        { href: '/rent/short', label: 'Short Term' },
        { href: '/rent/long', label: 'Long Term' },
      ]
    }
  }

  return (
    <>
      <header className={`${poppins.className} bg-white shadow-xl sticky top-0 left-0 right-0 z-50 animate-fade-in-up`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between min-h-10 sm:min-h-11">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Link href="/" aria-label="Home" className="shrink-0">
                <Image
                  src="/Untitled-1.png"
                  alt="Logo"
                  width={180}
                  height={160}
                  priority
                  className="w-auto h-14 sm:h-16 md:h-19 lg:h-20 xl:h-22"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:space-x-2 xl:space-x-4 text-black items-center text-sm xl:text-base">
                {/* Regular Nav Items */}
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2 xl:px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 xl:gap-2 whitespace-nowrap ${
                      pathname === item.href ? 'border-b-2 border-black font-bold' : ''
                    }`}
                  >
                    <svg className="w-3 h-3 xl:w-4 xl:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                ))}

                {/* Dropdown Menus */}
                {Object.entries(dropdownMenus).map(([key, menu]) => (
                  <div key={key} className="relative group">
                    <button
                      className={`px-2 xl:px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 xl:gap-2 whitespace-nowrap ${
                        pathname.startsWith(`/${key}`) ? 'border-b-2 border-black font-bold' : ''
                      }`}
                    >
                      <svg className="w-3 h-3 xl:w-4 xl:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu.icon} />
                      </svg>
                      <span className="hidden lg:inline">{menu.label}</span>
                      <svg className="w-3 h-3 xl:w-4 xl:h-4 group-hover:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {menu.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-sm block px-4 py-2 hover:bg-gray-100 ${
                            pathname === item.href ? 'font-bold text-gray-900 bg-gray-100' : ''
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Contact Link */}
                <Link
                  href="/contact"
                  className={`px-2 xl:px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1 xl:gap-2 whitespace-nowrap ${
                    pathname === '/contact' ? 'border-b-2 border-black font-bold' : ''
                  }`}
                >
                  <svg className="w-3 h-3 xl:w-4 xl:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden lg:inline">Contact Us</span>
                </Link>
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex text-black items-center gap-2 sm:gap-3">
              {/* Search Bar - appears after scrolling */}
              {pathname !== '/' && (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      const query = (e.currentTarget.search.value as string).trim()
      if (query) {
        router.push(`/search?query=${encodeURIComponent(query)}`)
      }
    }}
    className="relative shrink-0 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80"
  >
    {/* Input */}
    <input
      type="text"
      name="search"
      placeholder="Search..."
      className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-sm md:text-base"
    />

    {/* Magnifying glass icon */}
    <button
      type="submit"
      className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </form>
)}

              {/* Desktop Auth Buttons - Show/Hide based on login status */}
              {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-sm text-gray-700">Hi, {userName}</span>
                <button
                onClick={handleLogout}
                className=" cursor-pointer text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
              ) : (
              <>
              <Link
              href="/login"
              className="hidden lg:block text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-black text-white rounded-full hover:shadow-[0_0_20px_black] transition duration-300 whitespace-nowrap"
              >
                Log in
              </Link>
              <Link
              href="/signup"
              className="hidden lg:block text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-200 text-black rounded-full hover:shadow-[0_0_20px_black] transition duration-300 whitespace-nowrap"
              >
              Sign-up
              </Link>
              </>
            )}

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="lg:hidden p-1.5 sm:p-2 rounded bg-gray-100 hover:bg-gray-200 shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9998 }}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Mobile Menu Panel */}
      <aside
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 9999 }}
        aria-hidden={!open}
      >
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="text-base sm:text-lg text-black font-semibold">Menu</div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-black p-1.5 sm:p-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="text-black space-y-1 sm:space-y-2">
            {/* Regular Nav Items */}
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 text-sm sm:text-base ${
                  pathname === item.href ? 'font-bold text-gray-900 bg-gray-100' : ''
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}

            {/* Dropdown Menus */}
            {Object.entries(dropdownMenus).map(([key, menu]) => (
              <div key={key}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                  className={`w-full text-left px-2 sm:px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between text-sm sm:text-base ${
                    pathname.startsWith(`/${key}`) ? 'font-bold text-gray-900 bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu.icon} />
                    </svg>
                    {menu.label}
                  </div>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform shrink-0 ${openDropdown === key ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === key && (
                  <div className="pl-4 sm:pl-6 space-y-1 mt-1">
                    {menu.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block px-2 py-2 rounded hover:bg-gray-100 text-sm ${
                          pathname === item.href ? 'font-bold text-gray-900 bg-gray-100' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Link */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 text-sm sm:text-base ${
                pathname === '/contact' ? 'font-bold text-gray-900 bg-gray-100' : ''
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </Link>

            {/* Mobile Auth Buttons */}
<div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
  {isLoggedIn ? (
    <>
      <div className="px-4 py-2 text-center text-gray-700">
        Logged in as <span className="font-semibold">{userName}</span>
      </div>
      <button
        onClick={handleLogout}
        className="block w-full text-center px-4 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 text-sm sm:text-base font-semibold"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        onClick={() => setOpen(false)}
        className="block text-center px-4 py-3 bg-black text-white rounded-full hover:shadow-[0_0_20px_black] transition duration-300 text-sm sm:text-base font-semibold"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        onClick={() => setOpen(false)}
        className="block text-center px-4 py-3 bg-white border-2 border-gray-900 text-black rounded-full hover:shadow-[0_0_20px_black] transition duration-300 text-sm sm:text-base font-semibold"
      >
        Sign up
      </Link>
    </>
  )}
</div>
          </nav>
        </div>
      </aside>
    </>
  )
}