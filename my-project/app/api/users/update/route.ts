import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest) {
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
    const { id, name, email, password, userType } = body

    // Validation
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if email is being changed and if new email already exists
    if (email.toLowerCase() !== existingUser.email?.toLowerCase()) {
      const emailExists = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 409 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      userType: userType || 'user',
    }

    // Hash new password if provided
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        status: 'active',
        joinedDate: updatedUser.createdAt.toISOString(),
        photoURL: updatedUser.image
      }
    })

  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update user',
        details: error.message 
      },
      { status: 500 }
    )
  }
}