import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface IColorTheme {
  theme: "dark" | "light";
}

const initialState: IColorTheme = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = "dark"
    },
    setLightTheme: (state) => {
      state.theme = "light"
    },
    toggleTheme:  (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    }
  },
});

export const { setDarkTheme, setLightTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
