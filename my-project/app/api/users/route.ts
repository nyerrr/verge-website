import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET(request: NextRequest) {
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

    // Get query parameters for filtering (optional)
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get('userType')

    // Build Prisma query with filters
    const where: any = {}
    
    if (userType) {
      where.userType = userType
    }

    // Fetch users from database
    const users = await prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
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

    // Format the response
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name || 'Unknown',
      email: user.email || '',
      userType: user.userType as 'admin' | 'user',
      status: 'active',
      joinedDate: user.createdAt.toISOString(),
      photoURL: user.image
    }))

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      count: formattedUsers.length
    })

  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        details: error.message 
      },
      { status: 500 }
    )
  }
}