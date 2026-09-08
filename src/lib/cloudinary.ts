import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "bagsglory/products"
): Promise<{ url: string; public_id: string }> {
  // Check if Cloudinary credentials are provided
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Cloudinary credentials not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env."
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:best" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Failed to upload image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
