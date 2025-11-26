// app/api/properties/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    // Get property ID from query params
    const { searchParams } = new URL(request.url);
    const propertyIdParam = searchParams.get('id');

    if (!propertyIdParam) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Convert string ID to number
    const propertyId = parseInt(propertyIdParam, 10);
    
    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    // Parse request body
    const data = await request.json();
    console.log('Updating property:', propertyId, data);

    // --- Authentication/Authorization ---
    const userDataHeader = request.headers.get("user-data");
    if (!userDataHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = JSON.parse(userDataHeader);
    if (userData.userType !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // --- Validate required fields ---
    if (!data.title || !data.propertyId || !data.price) {
      return NextResponse.json(
        { error: "Missing required fields: title, propertyId, or price" },
        { status: 400 }
      );
    }

    // --- Check if property exists ---
    const existingProperty = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // --- Normalize category/type (keep as lowercase) ---
    const normalizedCategory = data.category?.toLowerCase() || null;
    const normalizedType = data.type?.toLowerCase() || null;

    // --- Handle images ---
    let imagesArray: string[] = [];
    
    if (data.images) {
      try {
        if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } else if (typeof data.images === 'string') {
          imagesArray = JSON.parse(data.images);
        }
      } catch (err) {
        console.error('Error parsing images:', err);
        imagesArray = ['/property-placeholder.jpg'];
      }
    }

    if (imagesArray.length === 0) {
      imagesArray = ['/property-placeholder.jpg'];
    }

    const mainImage = imagesArray[0];
    const imagesJson = JSON.stringify(imagesArray);

    // --- Handle features ---
    let featuresJson = "{}";
    if (data.features) {
      try {
        featuresJson = typeof data.features === 'string' 
          ? data.features 
          : JSON.stringify(data.features);
      } catch (err) {
        console.error('Error parsing features:', err);
      }
    }

    console.log('Updating with:', {
      category: normalizedCategory,
      type: normalizedType,
      images: imagesJson,
      mainImage
    });

    // --- Update property in database ---
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title: data.title,
        description: data.description || '',
        price: data.price,
        location: data.location || '',
        category: normalizedCategory,
        type: normalizedType,
        status: data.status || 'Available',
        bedrooms: data.bedrooms || '',
        bathrooms: data.bathrooms || '',
        area: data.area || '',
        floorLevel: data.floorLevel || null,
        parking: data.parking || null,
        yearBuilt: data.yearBuilt || null,
        propertyId: data.propertyId,
        image: mainImage,
        images: imagesJson,
        features: featuresJson,
      },
    });

    console.log('Property updated successfully:', updatedProperty.id);

    // --- Revalidate property listing pages ---
    revalidatePath("/properties");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Update property error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to update property",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 