function extractFirstFile(value: unknown): File | null {
  if (!value) return null;
  if (value instanceof File) return value;
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    return value.length > 0 ? value[0] : null;
  }
  if (Array.isArray(value)) {
    return value.length > 0 && value[0] instanceof File ? value[0] : null;
  }
  return null;
}

export default extractFirstFile;
