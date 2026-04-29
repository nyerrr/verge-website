import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const [
      totalProperties,
      propertiesSold,
      availableProperties,
      pendingProperties,
      totalInquiries,
      pendingInquiries,
      recentProperties,
      recentInquiries
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'sold' } }),
      prisma.property.count({ where: { status: 'Available' } }),
      prisma.property.count({ where: { status: 'pending' } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'pending' } }),
      prisma.property.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, status: true, price: true, createdAt: true }
      }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, customerName: true, propertyTitle: true, status: true, createdAt: true }
      })
    ])

    const soldProperties = await prisma.property.findMany({
      where: { status: 'sold' },
      select: { price: true }
    })

    const totalRevenue = soldProperties.reduce((sum, property) => {
      const priceNum = parseFloat(property.price.replace(/[₱,]/g, ''))
      return sum + (isNaN(priceNum) ? 0 : priceNum)
    }, 0)

    const responseRate = totalInquiries > 0
      ? ((totalInquiries - pendingInquiries) / totalInquiries * 100).toFixed(1)
      : '0'

    const recentActivities = [
      ...recentProperties.map(property => ({
        id: `prop-${property.id}`,
        text: `New property "${property.title}" added`,
        time: getTimeAgo(property.createdAt),
        icon: '🏠',
        type: 'property'
      })),
      ...recentInquiries.map(inquiry => ({
        id: `inq-${inquiry.id}`,
        text: `New inquiry from ${inquiry.customerName}`,
        time: getTimeAgo(inquiry.createdAt),
        icon: '💬',
        type: 'inquiry'
      }))
    ]
    .sort((a, b) => {
      const aDate = recentProperties.find(p => `prop-${p.id}` === a.id)?.createdAt ||
                    recentInquiries.find(i => `inq-${i.id}` === a.id)?.createdAt
      const bDate = recentProperties.find(p => `prop-${p.id}` === b.id)?.createdAt ||
                    recentInquiries.find(i => `inq-${i.id}` === b.id)?.createdAt
      return new Date(bDate!).getTime() - new Date(aDate!).getTime()
    })
    .slice(0, 5)

    const stats = {
      totalProperties,
      availableProperties,
      propertiesSold,
      pendingProperties,
      totalInquiries,
      pendingInquiries,
      responseRate: parseFloat(responseRate),
      revenue: `₱${totalRevenue.toLocaleString('en-PH')}`,
      recentActivities
    }

    return NextResponse.json({ success: true, stats }, { status: 200 })

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
  return new Date(date).toLocaleDateString()
}