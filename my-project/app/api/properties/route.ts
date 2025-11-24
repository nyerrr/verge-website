// app/api/properties/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// 🚀 Setting to disable Next.js data cache for this endpoint.
export const dynamic = 'force-dynamic'; 

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Normalize query parameters to handle casing consistently
    const category = searchParams.get('category')?.toLowerCase();
    const type = searchParams.get('type')?.toLowerCase();

    // 🏗️ Build the WHERE clause for Prisma
    const where: any = {};
    if (category) where.category = category;
    if (type) where.type = type;

    // Fetch properties from the database
    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: 'desc' }, // Latest properties first
    });

    // ⚙️ Safely parse JSON fields for client consumption
    const parsedProperties = properties.map(prop => ({
      ...prop,
      // Convert JSON strings back to JavaScript array/object, defaulting to empty structures
      images: prop.images ? JSON.parse(prop.images) : [],
      features: prop.features ? JSON.parse(prop.features) : {},
    }));

    return NextResponse.json(parsedProperties);
    
  } catch (error: any) {
    console.error('Get properties error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}