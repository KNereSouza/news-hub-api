import UploadVideoService from "../services/UploadVideoService.js";

export default class UploadVideoController {
  constructor(uploadVideoService = new UploadVideoService()) {
    this.uploadVideoService = uploadVideoService;
  }

  async handle(request, response) {
    try {
      const data = await this.uploadVideoService.handle(request.file);
      const url = data.previewUrl;

      return response.status(201).json({ previewUrl: url });
    } catch (error) {
      return response.status(500).json({
        message: `Failed to upload file, please try again later.`,
      });
    }
  }
}
