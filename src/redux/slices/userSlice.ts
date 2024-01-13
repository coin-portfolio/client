import { UserStateType } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserStateType = {
  userId: '',
};

export const userId = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    logOut: () => {
      return {
        userId: '',
      };
    },
    logIn: (_, action) => {
      return { userId: action.payload };
    },
  },
});

export const { logIn, logOut } = userId.actions;
export default userId.reducer;
