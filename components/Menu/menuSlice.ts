import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface MenuState {
  activeButton: string;
}

const initialState: MenuState = {
  activeButton: 'leaflet',
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeButton = action.payload;
    },
  },
});

export const { setActiveButton } = menuSlice.actions;

// export const selectActiveButton = (state: RootState) => state.menu.activeButton;

export default menuSlice.reducer;
