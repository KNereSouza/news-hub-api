/**
 * Generates a URL-friendly slug from a given string.
 *
 * Converts the input text to lowercase, removes diacritics, strips out
 * non-alphanumeric characters (except spaces and hyphens), trims whitespace,
 * replaces spaces with hyphens, and collapses multiple hyphens into one.
 *
 * @param   { string } text - The input string to be converted into a slug.
 * @returns { string } The generated slug suitable for use in URLs.
 */
export default function generateSlug(text) {
  return text
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
