"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {HiEye, HiEyeOff} from 'react-icons/hi'
import PageTransition from '../components/PageTransition'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        userType: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        // Validate user type selected
        if (!formData.userType) {
            setError('Please select a user type')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    userType: formData.userType
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed')
            }

            // Save user data and redirect to login
            alert('Account created successfully! Please login.')
            router.push('/login')
            
        } catch (err: any) {
            setError(err.message || 'Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PageTransition>
            <div className="relative min-h-screen w-full flex items-start justify-center py-12 overflow-y-auto">
                <Image
                    src="/The_Albany1.png"
                    alt="Signup background"
                    fill
                    className="object-cover"
                />
                
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                
                <div className="relative z-10 w-full max-w-md mx-4 my-8 rounded-lg shadow-xl p-8 bg-white border-2 border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-black">Sign-up</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="John Doe"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="example@gmail.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="09123456789"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* User Type */}
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                                User Type
                            </label>
                            <select 
                                id="userType" 
                                value={formData.userType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-black rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                                required
                                disabled={isLoading}
                            >
                                <option value="" disabled>Select user type</option>   
                                <option value="buyer">Buyer</option>
                                <option value="renter">Renter</option>
                                <option value="seller">Seller</option>
                                <option value="agent">Agent / Broker</option>
                            </select>
                        </div>
                        
                        {/* Password */}
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-12 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="password..."
                                    required
                                    disabled={isLoading}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}  
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="w-full">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-12 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="confirm password..."
                                    required
                                    disabled={isLoading}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}  
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 transition-colors"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-2 px-4 text-white bg-black rounded-full cursor-pointer hover:scale-105 mt-6 transition duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating account...' : 'Sign up'}
                        </button>

                        {/* Login Link */}
                        <Link 
                            href="/login" 
                            className="block text-center text-sm text-blue-600 hover:underline mt-4"
                        >
                            Already have an account? Login
                        </Link>
                    </form>
                </div>
            </div>
        </PageTransition>
    )
}