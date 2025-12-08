import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Get user data from headers for authentication
    const userDataHeader = request.headers.get('user-data')
    if (!userDataHeader) {
      return NextResponse.json(
        { error: 'Unauthorized - No user data provided' },
        { status: 401 }
      )
    }

    const userData = JSON.parse(userDataHeader)
    
    // Check if user is admin
    if (userData.userType !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, password, userType } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password if provided
    let hashedPassword = null
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        userType: userType || 'user',
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        image: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      userId: newUser.id,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        status: 'active',
        joinedDate: newUser.createdAt.toISOString(),
        photoURL: newUser.image
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create user',
        details: error.message 
      },
      { status: 500 }
    )
  }
}