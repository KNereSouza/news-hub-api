import UploadImageService from "../services/UploadImageService.js";

export default class UploadImageController {
  constructor(uploadImageService = new UploadImageService()) {
    this.uploadImageService = uploadImageService;
  }

  async handle(request, response) {
    try {
      const data = await this.uploadImageService.handle(request.file);
      const url = data.result.variants[0];

      return response.status(201).json({ url: url });
    } catch (error) {
      return response.status(500).json({
        message: `Failed to upload file, please try again later.`,
      });
    }
  }
}
