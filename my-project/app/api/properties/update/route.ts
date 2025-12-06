// app/api/properties/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Update request received:', data);

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
    if (!data.id) {
      return NextResponse.json(
        { error: "Property ID required for update" },
        { status: 400 }
      );
    }

    // --- Check if property exists ---
    const existingProperty = await prisma.property.findUnique({
      where: { id: data.id } // Use string ID from body
    });

    if (!existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // --- Normalize category/type ---
    const normalizedCategory = data.category?.toLowerCase() || existingProperty.category;
    const normalizedType = data.type?.toLowerCase() || existingProperty.type;

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
        return NextResponse.json(
          { error: "Invalid images format" },
          { status: 400 }
        );
      }
    } else {
      // Keep existing images if none provided
      try {
        imagesArray = JSON.parse(existingProperty.images || '[]');
      } catch {
        imagesArray = [existingProperty.image || '/property-placeholder.jpg'];
      }
    }

    if (imagesArray.length === 0) {
      imagesArray = ['/property-placeholder.jpg'];
    }

    const mainImage = imagesArray[0];
    const imagesJson = JSON.stringify(imagesArray);

    // --- Handle features ---
    let featuresJson = existingProperty.features || "{}";
    if (data.features) {
      try {
        featuresJson = typeof data.features === 'string' 
          ? data.features 
          : JSON.stringify(data.features);
      } catch (err) {
        console.error('Error parsing features:', err);
        return NextResponse.json(
          { error: "Invalid features format" },
          { status: 400 }
        );
      }
    }

    // --- Convert numeric fields to strings if needed ---
    const bedroomsValue = data.bedrooms !== undefined 
      ? String(data.bedrooms) 
      : existingProperty.bedrooms;
    
    const bathroomsValue = data.bathrooms !== undefined 
      ? String(data.bathrooms) 
      : existingProperty.bathrooms;
    
    const areaValue = data.area !== undefined 
      ? String(data.area) 
      : existingProperty.area;
    
    const floorLevelValue = data.floorLevel !== undefined 
      ? (data.floorLevel !== null ? String(data.floorLevel) : null)
      : existingProperty.floorLevel;
    
    const parkingValue = data.parking !== undefined 
      ? (data.parking !== null ? String(data.parking) : null)
      : existingProperty.parking;
    
    const yearBuiltValue = data.yearBuilt !== undefined 
      ? (data.yearBuilt !== null ? String(data.yearBuilt) : null)
      : existingProperty.yearBuilt;

    console.log('Updating property with id:', data.id);

    // --- Update property in database ---
    const updatedProperty = await prisma.property.update({
      where: { id: data.id }, // Use string ID
      data: {
        title: data.title,
        description: data.description ?? existingProperty.description,
        price: data.price,
        location: data.location ?? existingProperty.location,
        category: normalizedCategory,
        type: normalizedType,
        status: data.status ?? existingProperty.status,
        bedrooms: bedroomsValue,
        bathrooms: bathroomsValue,
        area: areaValue,
        floorLevel: floorLevelValue,
        parking: parkingValue,
        yearBuilt: yearBuiltValue,
        propertyId: data.propertyId ?? existingProperty.propertyId,
        image: mainImage,
        images: imagesJson,
        features: featuresJson,
      },
    });

    console.log('Property updated successfully:', updatedProperty.id);

    // --- Revalidate pages ---
    revalidatePath("/properties");
    revalidatePath(`/properties/${data.id}`);
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
  }
  // ✅ REMOVED the finally block with prisma.$disconnect()
}