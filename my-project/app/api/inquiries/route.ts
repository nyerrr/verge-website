// app/api/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import { Resend } from 'resend'

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

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
      response: inquiry.response,
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

// PATCH - Update inquiry status or send a response
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, response } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    const inquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}

    if (response !== undefined) {
      updateData.response = response
      if (status === undefined) {
        updateData.status = 'responded'
      }
    }

    if (status !== undefined) {
      if (!['pending', 'responded', 'closed'].includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status value' },
          { status: 400 }
        )
      }
      updateData.status = status
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: updateData
    })

    if (
      response &&
      resendClient &&
      process.env.RESEND_FROM_EMAIL &&
      inquiry.customerEmail
    ) {
      try {
        await resendClient.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: inquiry.customerEmail,
          subject: `Response to your inquiry about ${inquiry.propertyTitle}`,
          html: `<p>Hi ${inquiry.customerName},</p>
<p>Thank you for your inquiry. Here is our response:</p>
<div style="padding: 16px; background: #f4f4f7; border-radius: 8px;">
  <p>${response.replace(/\n/g, '<br />')}</p>
</div>
<p>Best regards,<br/>The Verge Team</p>`
        })
      } catch (emailError) {
        console.error('Error sending response email:', emailError)
      }
    }

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