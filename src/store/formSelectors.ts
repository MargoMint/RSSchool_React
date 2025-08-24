import type { RootState } from './store';
import type { StoredFormData } from '../components/Forms/formTypes';

export const selectSubmissions = (state: RootState): StoredFormData[] =>
  state.forms.submissions;

export const selectLastSubmission = (
  state: RootState
): StoredFormData | undefined =>
  state.forms.submissions[state.forms.submissions.length - 1];

export const selectSubmissionsCount = (state: RootState): number =>
  state.forms.submissions.length;
