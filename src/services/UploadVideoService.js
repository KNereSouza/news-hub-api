import { configDotenv } from "dotenv";
import FormData from "form-data";
import fetch from "node-fetch";

configDotenv();

const CLOUDFLARE_ACC_ID = process.env.CLOUDFLARE_ACC_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

export default class UploadVideoService {
  async handle(file) {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;

    try {
      const formData = new FormData();

      formData.append("file", file.buffer, fileName);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACC_ID}/stream`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
            ...formData.getHeaders(),
          },
          body: formData,
        }
      );

      const { ...data } = await response.json();

      if (!data.success) {
        const messages = data.errors.map((error) => error.message);

        throw new Error(
          data.errors && data.errors.length
            ? `Image upload failed: ${messages}`
            : `Image upload failed with status ${response.status}`
        );
      }

      return {
        success: data.success,
        uploadedAt: data.result.uploaded,
        createdAt: data.result.created,
        modifiedAt: data.result.modified,
        metadata: data.result.meta,
        previewUrl: data.result.preview,
      };
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  }
}
