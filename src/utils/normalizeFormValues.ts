import processFileToBase64 from './processFileToBase64';
import type { StoredFormData } from '../components/Forms/FormTypes';

export default async function normalizeFormValues(
  values: Record<string, unknown>
): Promise<StoredFormData> {
  const copy: Record<string, unknown> = { ...values };

  if (copy.age != null) {
    const numericValue = +copy.age;
    copy.age = Number.isFinite(numericValue) ? numericValue : 0;
  }

  if (copy.picture) {
    const pict = copy.picture;
    let fileToProcess: File | null = null;

    if (pict instanceof File) {
      fileToProcess = pict;
    } else if (
      typeof FileList !== 'undefined' &&
      pict instanceof FileList &&
      pict.length > 0
    ) {
      fileToProcess = pict[0];
    } else if (
      Array.isArray(pict) &&
      pict.length > 0 &&
      pict[0] instanceof File
    ) {
      fileToProcess = pict[0];
    } else if (typeof pict === 'string') {
      copy.picture = pict;
    }

    if (fileToProcess) {
      try {
        const base64 = await processFileToBase64(fileToProcess);
        copy.picture = base64;
      } catch {
        delete copy.picture;
      }
    }
  }

  copy.acceptTermsAndCondition = Boolean(
    copy.acceptTermsAndCondition === true ||
      copy.acceptTermsAndCondition === 'true' ||
      copy.acceptTermsAndCondition === 'on' ||
      copy.acceptTermsAndCondition === '1'
  );

  delete copy.confirmPassword;

  const result: StoredFormData = {
    name: (copy.name?.toString() ?? '').trim(),
    age: +(copy.age ?? 0) || 0,
    email: (copy.email?.toString() ?? '').trim(),
    password: (copy.password?.toString() ?? '').trim(),
    gender: (copy.gender?.toString() ?? '').trim(),
    country: (copy.country?.toString() ?? '').trim(),
    acceptTermsAndCondition: !!copy.acceptTermsAndCondition,
    picture: typeof copy.picture === 'string' ? copy.picture : undefined,
  };

  return result;
}
