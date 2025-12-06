// app/api/properties/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch properties with optional filtering
export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    console.log('Fetching properties with filters:', { category, type });

    // Build the where clause based on filters
    const whereClause: any = {};
    
    if (category && category !== 'all') {
      whereClause.category = category.toLowerCase();
    }
    
    if (type && type !== 'all') {
      whereClause.type = type.toLowerCase();
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${properties.length} properties`);

    return NextResponse.json({
      success: true,
      properties: properties
    }, { status: 200 });

  } catch (error: any) {
    console.error("Fetch properties error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to fetch properties",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}