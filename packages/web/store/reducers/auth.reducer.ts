import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = {
  isReady: boolean;
  isAuth: boolean;
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: { isReady: false, isAuth: false } as AuthSliceState,
  reducers: {
    setAuth: (_, { payload }: PayloadAction<AuthSliceState>) => payload,
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
