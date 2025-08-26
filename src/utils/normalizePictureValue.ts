function normalizePictureValue(value: unknown): unknown {
  if (!value) return undefined;
  if (value instanceof File) {
    if (value.size === 0) return undefined;
    return value;
  }
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    if (value.length === 0) return undefined;
    return Array.from(value);
  }
  if (Array.isArray(value)) {
    const first = value[0];
    if (first instanceof File) return value;
    return undefined;
  }
  return undefined;
}

export default normalizePictureValue;
