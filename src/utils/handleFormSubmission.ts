import normalizeFormValues from './normalizeFormValues';
import { addSubmission } from '../store/formSlice';
import { store } from '../store/store';
import type { StoredFormData } from '../components/Forms/FormTypes';

export default async function handleFormSubmission(
  values: Record<string, unknown>
): Promise<StoredFormData> {
  const payload = await normalizeFormValues(values);
  store.dispatch(addSubmission(payload));
  return payload;
}
