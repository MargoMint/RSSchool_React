function normalizePictureValue(
  value: unknown
): File | File[] | string | undefined {
  if (!value) return undefined;

  if (value instanceof File) {
    return value.size > 0 ? value : undefined;
  }

  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    return value.length > 0 ? Array.from(value) : undefined;
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value[0] instanceof File ? value : undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}

export default normalizePictureValue;
