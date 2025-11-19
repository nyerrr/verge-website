"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {HiEye, HiEyeOff} from 'react-icons/hi'

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            {/* Background Image */}
            <Image
                src="/The_Albany1.png"
                alt="login"
                fill
                className="object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            {/* Login Form Container */}
            <div 
                className="relative z-10 w-full max-w-md mx-8 rounded-lg shadow-xl p-8 bg-white  border-2 border-gray-800"
                
            >
                <h2 className="text-2xl font-bold mb-6 text-black">Sign-up</h2>
                
                <form className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    
                    {/* Password Field */}
                    <div className="relative w-full mb-4">
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className=" w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="password..."
                            
                        />
                        {/*EYE ICON*/}
                        <button type="button" 
                        onClick={() => setShowPassword(!showPassword)}  
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black"
                        >
                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} /> }
                        </button>
                    </div>
                     <div className="relative w-full mb-4">
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className=" w-full px-4 py-2 text-black placeholder:text-gray-400 rounded-2xl border border-black focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="confirm password..."
                            
                        />
                        {/*EYE ICON*/}
                        <button type="button" 
                        onClick={() => setShowPassword(!showPassword)}  
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black"
                        >
                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} /> }
                        </button>
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 text-white bg-black rounded-full cursor-pointer hover:scale-105 mt-2 transition duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    >
                        Sign-in
                    </button>
                
                </form>
            </div>
        </div>
    )
}