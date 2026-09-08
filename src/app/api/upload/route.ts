import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "bagsglory/products";

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided in upload request." },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image (JPEG, PNG, WebP, GIF, AVIF)." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If Cloudinary credentials are set, upload directly to Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const result = await uploadToCloudinary(buffer, folder);
      return NextResponse.json({
        success: true,
        url: result.url,
        public_id: result.public_id,
        source: "cloudinary",
      });
    }

    // Fallback: If Cloudinary keys not yet entered in .env, generate a Base64 data URL for preview
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      source: "local_preview",
      note: "Cloudinary credentials not set in .env yet. Image preview generated as data URL.",
    });
  } catch (error: any) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
