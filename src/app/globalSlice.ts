import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IGlobalState {
    successMessage: string,
    errorMessage: string,
}

const initialState: IGlobalState = {
    successMessage: '',
    errorMessage: '',
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            console.log('action.payload', action.payload);
            
            state.errorMessage = action.payload;
        },
    },
});

export const { setSuccessMessage, setErrorMessage} = globalSlice.actions;

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;