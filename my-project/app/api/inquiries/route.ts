// app/api/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

// GET all inquiries
export async function GET(request: NextRequest) {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format dates for frontend
    const formattedInquiries = inquiries.map(inquiry => ({
      id: inquiry.id,
      customerName: inquiry.customerName,
      customerEmail: inquiry.customerEmail,
      phoneNumber: inquiry.phoneNumber,
      propertyTitle: inquiry.propertyTitle,
      message: inquiry.message,
      status: inquiry.status,
      date: inquiry.createdAt.toISOString()
    }))

    return NextResponse.json({ inquiries: formattedInquiries }, { status: 200 })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// PATCH - Update inquiry status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    // Validate status
    if (!['pending', 'responded', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Update inquiry in database
    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry updated successfully',
        inquiry: updatedInquiry
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

// DELETE - Delete an inquiry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    await prisma.inquiry.delete({
      where: { id }
    })

    return NextResponse.json(
      { success: true, message: 'Inquiry deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}