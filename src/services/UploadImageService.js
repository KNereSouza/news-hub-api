import { configDotenv } from "dotenv";
import FormData from "form-data";
import fetch from "node-fetch";

configDotenv();

const CLOUDFLARE_ACC_ID = process.env.CLOUDFLARE_ACC_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

export default class UploadImageService {
  async handle(file) {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;

    try {
      const formData = new FormData();

      formData.append("file", file.buffer, fileName);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACC_ID}/images/v1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
            ...formData.getHeaders(),
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const messages = result.errors.map((error) => error.message);

        throw new Error(
          result.errors && result.errors.length
            ? `Image upload failed: ${messages}`
            : `Image upload failed with status ${response.status}`
        );
      }

      return {
        ...result,
        info: {
          name: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
        },
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}
