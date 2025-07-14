import { getExtension, getMimeType, getSize } from "../utils/fileUtils.js";

const supportedMediaTypes = {
  image: ["png", "jpg", "jpeg", "webp", "gif"],
  video: ["mp4", "wmv", "avi", "webm", "mpeg"],
};

const equivalentExtensions = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "image/gif": ["gif"],
  "video/mp4": ["mp4"],
  "video/webm": ["webm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-msvideo": ["avi"],
  "video/mpeg": ["mpeg", "mpg"],
};

const sizeLimits = {
  image: 10 * 1024 * 1024,
  video: 200 * 1024 * 1024,
};

const validateFileType = (request, response, next) => {
  const file = request.file;

  if (!file || typeof file !== "object") {
    return response.status(400).json({
      message:
        "File is missing or invalid. Please upload a valid file and try again.",
    });
  }

  const mimeType = getMimeType(file);
  const extension = getExtension(file);
  const size = getSize(file);

  if (!mimeType || !extension || !size) {
    return response.status(400).json({
      message: "File metadata is incomplete. Please upload a valid file.",
    });
  }

  if (!mimeType.startsWith("image/") && !mimeType.startsWith("video/")) {
    return response.status(400).json({
      message: "File type not supported. Please upload a valid file.",
    });
  }

  if (
    !supportedMediaTypes.image.includes(extension) &&
    !supportedMediaTypes.video.includes(extension)
  ) {
    return response.status(400).json({
      message: "File type not supported. Please upload a valid file.",
    });
  }

  if (!equivalentExtensions[mimeType].includes(extension)) {
    return response.status(400).json({
      message:
        "File extension does not match MIME type. Please upload a valid file.",
    });
  }

  if (supportedMediaTypes.image.includes(extension)) {
    if (size > sizeLimits.image) {
      return response.status(400).json({
        message:
          "Image file size exceeds the 10MB limit. Please upload a smaller image.",
      });
    }
  }

  if (supportedMediaTypes.video.includes(extension)) {
    if (size > sizeLimits.video) {
      return response.status(400).json({
        message:
          "Video file size exceeds the 200MB limit. Please upload a smaller video.",
      });
    }
  }

  next();
};

export default validateFileType;
