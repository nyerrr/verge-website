// app/api/properties/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./../../../lib/prisma"; // Adjust the path as needed
import { revalidatePath } from "next/cache";
import cloudinary from "../../../lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
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

    // --- Normalize category/type ---
    const normalizedCategory = data.category?.toLowerCase() || null;
    const normalizedType = data.type?.toLowerCase() || null;

    // --- Upload images to Cloudinary ---
    // --- Upload images to Cloudinary ---
    let imagesArray: string[] = [];

    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      console.log('Images received:', data.images.length)
      console.log('First image preview:', data.images[0]?.substring(0, 50))
      
      const uploadPromises = data.images.map(async (image: string) => {
        if (image.startsWith('http') || image.startsWith('/')) {
          console.log('Skipping URL image:', image)
          return image
        }
        
        console.log('Uploading to Cloudinary...')
        const result = await cloudinary.uploader.upload(image, {
          folder: 'verge-properties',
          resource_type: 'image',
        })
        console.log('Uploaded:', result.secure_url)
        return result.secure_url
      })

      imagesArray = await Promise.all(uploadPromises)
      console.log('Images uploaded successfully:', imagesArray)
    }

    // Fallback to placeholder if no images
    if (imagesArray.length === 0) {
      imagesArray = ['/property-placeholder.jpg']
    }

    const mainImage = imagesArray[0]

    // --- Handle features ---
    let featuresObj = {}
    if (data.features) {
      try {
        featuresObj = typeof data.features === 'string'
          ? JSON.parse(data.features)
          : data.features
      } catch (err) {
        console.error('Error parsing features:', err)
      }
    }

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
        images: imagesArray,      // ✅ store as Json array, not stringified
        features: featuresObj,    // ✅ store as Json object, not stringified
        createdBy: userData.email,
      },
    });

    console.log('Property created successfully:', newProperty.id);

    revalidatePath("/properties");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Create property error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create property",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}