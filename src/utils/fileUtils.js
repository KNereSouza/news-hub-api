/**
 * Returns the mimetype of a Multer file buffer.
 * @param   { Object } file - Multer file object.
 * @returns { string|null } The mimetype or null if not found.
 */
export function getMimeType(file) {
  if (file && typeof file.mimetype === "string") {
    console.log(file.mimetype);
    return file.mimetype;
  }
  return null;
}

/**
 * Returns the file extension of a Multer file.
 * @param   { Object } file - Multer file object.
 * @returns { string|null } The file extension or null if not found.
 */
export function getExtension(file) {
  if (file && typeof file.originalname === "string") {
    const parts = file.originalname.split(".");
    if (parts.length > 1) {
      return parts.pop().toLowerCase();
    }
  }
  return null;
}

/**
 * Returns the size of a Multer file in bytes.
 * @param   { Object } file - Multer file object.
 * @returns { number|null } The file size in bytes or null if not found.
 */
export function getSize(file) {
  if (file && typeof file.size === "number") {
    return file.size;
  }
  return null;
}
