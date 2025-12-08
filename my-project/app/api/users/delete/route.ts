import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function DELETE(request: NextRequest) {
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

    // Get user ID from query parameters
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent self-deletion
    if (userToDelete.email === userData.email) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 403 }
      )
    }

    // Optional: Prevent deletion of last admin
    if (userToDelete.userType === 'admin') {
      const adminCount = await prisma.user.count({
        where: { userType: 'admin' }
      })
      
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin user' },
          { status: 403 }
        )
      }
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      deletedUserId: userId,
      deletedUserName: userToDelete.name
    })

  } catch (error: any) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete user',
        details: error.message 
      },
      { status: 500 }
    )
  }
}