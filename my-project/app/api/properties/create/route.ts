// create-route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // --- Authentication/Authorization ---
    const userDataHeader = request.headers.get("user-data");
    if (!userDataHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = JSON.parse(userDataHeader);
    if (userData.userType !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // --- Normalize category/type ---
    const normalizedCategory = data.category?.toLowerCase() ?? null;
    const normalizedType = data.type?.toLowerCase() ?? null;

    // --- Handle main image and JSON fields ---
    const mainImage: string | null =
      Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : null;

    const imagesJson: string | null = data.images ? JSON.stringify(data.images) : "[]";
const featuresJson: string | null = data.features ? JSON.stringify(data.features) : "{}";

const newProperty = await prisma.property.create({
  data: {
    title: data.title,
    description: data.description,
    price: data.price,
    location: data.location ?? undefined,
    category: normalizedCategory ?? undefined,
    type: normalizedType ?? undefined,
    status: data.status ?? undefined,
    bedrooms: data.bedrooms ?? undefined,
    bathrooms: data.bathrooms ?? undefined,
    area: data.area ?? undefined,
    floorLevel: data.floorLevel ?? undefined,
    parking: data.parking ?? undefined,
    yearBuilt: data.yearBuilt ?? undefined,
    propertyId: data.propertyId ?? undefined,
    image: mainImage ?? undefined,      // main image
    images: imagesJson,            // JSON string or null
    features: featuresJson,        // JSON string or null
    createdBy: userData.email,
  },
});


    // --- Revalidate property listing page ---
    revalidatePath("/lot");

    return NextResponse.json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Create property error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create property" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
