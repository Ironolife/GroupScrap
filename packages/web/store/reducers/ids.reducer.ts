import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Id = {
  type: 'group' | 'page';
  value: string;
};

const idsSlice = createSlice({
  name: 'idsSlice',
  initialState: [] as Id[],
  reducers: {
    setIds: (_, { payload }: PayloadAction<Id[]>) => payload,
  },
});

export const { setIds } = idsSlice.actions;
export default idsSlice.reducer;
