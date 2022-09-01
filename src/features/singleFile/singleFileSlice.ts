import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IFile } from "../addForm/types";
import { ISingleFileState } from "./types";

const initialState: ISingleFileState = {
    editableFile: {
        id: '',
        name: '',
        parentId: '',
        content: '',
    },
};

export const singleFileSlice = createSlice({
    name: "singleFile",
    initialState,
    reducers: {
        setEditableFile: (state, action: PayloadAction<IFile>) => {
            state.editableFile = action.payload;
        },
        setContent: (state, action: PayloadAction<string>) => {
            state.editableFile.content = action.payload;
        },
    },
});

export const { setEditableFile, setContent} = singleFileSlice.actions;

export const selectSingleFile = (state: RootState) => state.singleFile;

export default singleFileSlice.reducer;
