import type { RootState } from './store';
import type { StoredFormData } from '../components/Forms/FormTypes';

export const selectSubmissions = (state: RootState): StoredFormData[] =>
  state.forms.submissions;
