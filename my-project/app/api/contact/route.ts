// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create inquiry in database
    const inquiry = await prisma.inquiry.create({
      data: {
        customerName: name,
        customerEmail: email,
        phoneNumber: phone || null,
        propertyTitle: 'General Inquiry',
        message: message,
        status: 'pending'
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully', 
        inquiry 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}