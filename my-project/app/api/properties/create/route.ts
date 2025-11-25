// app/api/properties/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json();
    console.log('Received data:', data);

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

    // --- Normalize category/type (keep as lowercase) ---
    const normalizedCategory = data.category?.toLowerCase() || null;
    const normalizedType = data.type?.toLowerCase() || null;

    // --- Handle images ---
    let imagesArray: string[] = [];
    
    if (data.images) {
      try {
        // If images is already an array, use it
        if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } 
        // If images is a string, try to parse it
        else if (typeof data.images === 'string') {
          imagesArray = JSON.parse(data.images);
        }
      } catch (err) {
        console.error('Error parsing images:', err);
        imagesArray = ['/property-placeholder.jpg'];
      }
    }

    // Fallback to placeholder if no images
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

    console.log('Creating property with:', {
      category: normalizedCategory,
      type: normalizedType,
      images: imagesJson,
      mainImage
    });

    // --- Create property in database ---
    const newProperty = await prisma.property.create({
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
        createdBy: userData.email,
      },
    });

    console.log('Property created successfully:', newProperty.id);

    // --- Revalidate property listing pages ---
    revalidatePath("/properties");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Create property error:", error);
    
    // Return proper JSON error response
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to create property",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}