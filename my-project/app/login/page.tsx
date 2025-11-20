"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {HiEye, HiEyeOff} from 'react-icons/hi'
import PageTransition from '../components/PageTransition'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            // Save user data
            localStorage.setItem('userData', JSON.stringify(data.user))

            // Redirect based on userType
            if (data.user.userType === 'admin') {
                router.push('/admin')  // Go to admin page
            } else {
                router.push('/')  // Go to home page
            }
            
        } catch (err: any) {
            setError(err.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PageTransition>
            <div className="relative min-h-screen w-full flex items-center justify-center">
                <Image src="/The_Albany1.png" alt="login" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                
                <div className="relative z-10 w-full max-w-md mx-8 rounded-lg shadow-xl p-8 bg-white border-2 border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="example@gmail.com"
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
                                    placeholder="password..."
                                    required
                                    disabled={isLoading}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}  
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-2 px-4 text-white bg-black rounded-full hover:scale-105 transition duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign-in'}
                        </button>
                        
                        <Link href="/signup" className="block text-center text-sm text-blue-600 hover:underline mt-4">
                            Don't have an account?
                        </Link>
                    </form>
                </div>
            </div>
        </PageTransition>
    )
}