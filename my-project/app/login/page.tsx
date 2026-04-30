"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import PageTransition from '../components/PageTransition'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { useSession } from "next-auth/react"

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "loading") return
        
        if (session) {
            const userType = session.user?.userType
            if (userType === 'admin') {
                router.push('/admin')
            } else {
                router.push('/')
            }
        }
    }, [session, status, router])

    // ✅ Accepts any valid email
    const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validate Gmail
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (isSignUp && !name.trim()) {
            setError('Please enter your name')
            return
        }

        setIsLoading(true)

        try {
            if (isSignUp) {
                // Create account via your API
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: email.toLowerCase(), 
                        password, 
                        name 
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error)
                }

                // After signup, automatically sign in with NextAuth
                const result = await signIn('credentials', {
                    email: email.toLowerCase(),
                    password: password,
                    redirect: false,
                })

                if (result?.error) {
                    throw new Error(result.error)
                }

                // Redirect based on userType
                if (data.user.userType === 'admin') {
                    router.push('/admin')
                } else {
                    router.push('/')
                }
            } else {
                // Sign in with NextAuth credentials provider
                const result = await signIn('credentials', {
                    email: email.toLowerCase(),
                    password: password,
                    redirect: false,
                })

                if (result?.error) {
                    throw new Error('Invalid email or password')
                }

                // NextAuth will handle the session, redirect based on session
                // The useEffect above will handle the redirect
                router.refresh()
            }
            
        } catch (err: any) {
            setError(err.message || 'Authentication failed')
        } finally {
            setIsLoading(false)
        }
    }

    if (status === "loading") {
        return (
            <PageTransition>
                <div className="relative min-h-screen w-full flex items-center justify-center">
                    <Image src="/The_Albany1.png" alt="login" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                    <div className="relative z-10 text-white text-xl">
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <div className="relative min-h-screen w-full flex items-center justify-center">
                <Image src="/The_Albany1.png" alt="login" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                
                <div className="relative z-10 w-full max-w-md mx-8 rounded-lg shadow-xl p-8 bg-white border-2 border-gray-800">
                    <h2 className="text-2xl font-bold mb-2 text-black text-center">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        {isSignUp ? 'Sign up with your email address' : 'Sign in to your account'}
                    </p>
                    
                    <div className="mb-6">
                        <GoogleAuthButton />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or {isSignUp ? 'sign up' : 'continue'} with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {isSignUp && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="John Doe"
                                    required={isSignUp}
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="yourname@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 pr-12 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}  
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer w-full py-2 px-4 text-white bg-black rounded-full hover:scale-105 transition duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setError('')
                            }}
                            className="cursor-pointer block w-full text-center text-sm text-blue-600 hover:underline mt-4"
                        >
                            {isSignUp 
                                ? 'Already have an account? Sign in' 
                                : "Don't have an account? Create one"}
                        </button>
                    </form>
                </div>
            </div>
        </PageTransition>
    )
}