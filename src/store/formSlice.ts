import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormsState, StoredFormData } from '../components/Forms/FormTypes';

const initialState: FormsState = {
  submissions: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<StoredFormData>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
