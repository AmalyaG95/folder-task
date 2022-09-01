import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IAddFormState, IFolder, IFile, IFolderPayload, IFilePayload, IFileSavePayload } from "./types";

const initialState: IAddFormState = {
    folders: localStorage.getItem("folders") !== null ? JSON.parse(localStorage.getItem("folders")!) : [],
    files: localStorage.getItem("files") !== null ? JSON.parse(localStorage.getItem("files")!) : [],
    trash: localStorage.getItem("trash") !== null ? JSON.parse(localStorage.getItem("trash")!) : {folders: [], files: []},
    currentParamsId: "",
};

export const addFormSlice = createSlice({
    name: "addForm",
    initialState,
    reducers: {
        addFolder: (state, action: PayloadAction<IFolder>) => {
            state.folders.push(action.payload);
            state.folders.forEach((folder, index) => {
                if (folder.id === action.payload.parentId) {
                    folder.children.folders.push(action.payload);
                    state.folders[index] = {
                        ...folder,
                        children: {
                            ...folder.children,
                            folders: folder.children.folders,
                        },
                    };
                }
            });
            localStorage.setItem("folders", JSON.stringify(state.folders));
        },
        addFile: (state, { payload: newFile }: PayloadAction<IFile>) => {
            if (state.currentParamsId === "") {
                state.files.push(newFile);
            } else {
                state.folders.find((folder) => folder.id === newFile.parentId)!.children.files.push(newFile);
            }
            localStorage.setItem("files", JSON.stringify(state.files));
        },
        setId: (state, action: PayloadAction<string>) => {
            state.currentParamsId = action.payload;
        },
        resetId: (state) => {
            state.currentParamsId = "";
        },
        deleteFolder: (state, action: PayloadAction<IFolderPayload>) => {
            const {folderId, parentId} = action.payload;
            state.trash.folders?.push(state.folders.find(folder => folder.id === folderId) as IFolder);

            if (parentId === '') {                
              state.folders = state.folders.filter(folder => folder.id !== folderId);
            } else {
              const parentFolder= state.folders.find(folder => folder.id === parentId) as IFolder;
              parentFolder.children.folders = parentFolder.children.folders.filter(folder => folder.id !== folderId);
              state.folders = state.folders.filter(folder => {
                return folder.parentId !== parentId || (folder.parentId === parentId && folder.id !== folderId);
              }); 
            }
            localStorage.setItem("folders", JSON.stringify(state.folders));
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        deleteFolderPermanently: (state, action: PayloadAction<string>) => {
            state.trash.folders = state.trash.folders.filter(folder => folder.id !== action.payload);
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        restoreFolder: (state, action: PayloadAction<IFolderPayload>) => {
            const {folderId, parentId} = action.payload;
            state.folders.push(state.trash.folders.find(folder => folder.id === folderId) as IFolder);
            if (parentId) {
                state.folders.find(folder => folder.id === parentId)!.children.folders.push(state.trash.folders.find(folder => folder.id === folderId) as IFolder);
            }
            state.trash.folders = state.trash.folders.filter(folder => folder.id !== folderId);
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        deleteFile: (state, action: PayloadAction<IFilePayload>) => {
            const {fileId, parentId} = action.payload;

            if (parentId === '') {                
              state.trash.files?.push(state.files.find(file => file.id === fileId) as IFile);
              state.files = state.files.filter(file => file.id !== fileId);
            } else {
              const parentFolder = state.folders.find(folder => folder.id === parentId) as IFolder;
              state.trash.files?.push(parentFolder.children.files.find(file => file.id === fileId) as IFile);
              parentFolder.children.files = parentFolder.children.files.filter(file => file.id !== fileId);
            }
            localStorage.setItem("folders", JSON.stringify(state.folders));
            localStorage.setItem("files", JSON.stringify(state.files));
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        deleteFilePermanently: (state, action: PayloadAction<string>) => {
            state.trash.files = state.trash.files.filter(file => file.id !== action.payload);
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        restoreFile: (state, action: PayloadAction<IFilePayload>) => {
            const {fileId, parentId} = action.payload;
            if (parentId) {
                state.folders.find(folder => folder.id === parentId)!.children.files?.push(state.trash.files.find(file => file.id === fileId) as IFile);
            } else {
                state.files.push(state.trash.files.find(file => file.id === fileId) as IFile);
            }
            state.trash.files = state.trash.files.filter(file => file.id !== fileId);
            localStorage.setItem("folders", JSON.stringify(state.folders));
            localStorage.setItem("files", JSON.stringify(state.files));
            localStorage.setItem("trash", JSON.stringify(state.trash));
        },
        saveFileContent: (state, action: PayloadAction<IFileSavePayload>) => {
            const {fileId, content} = action.payload;
            let fileData = state.files.find(file => file.id === fileId) as IFile;

            if (!fileData) {
                for (let i = 0; i < state.folders.length; i++) {
                    fileData = state.folders[i]?.children?.files?.find(file => file.id === fileId) as IFile;
                    if (fileData) break;
                }
            }
            fileData.content = content;
            localStorage.setItem("folders", JSON.stringify(state.folders));
            localStorage.setItem("files", JSON.stringify(state.files));
        },
    },
});

export const { 
    addFolder, 
    addFile, 
    setId, 
    resetId, 
    deleteFolder, 
    deleteFolderPermanently, 
    restoreFolder,
    deleteFile, 
    deleteFilePermanently,
    restoreFile,
    saveFileContent 
} = addFormSlice.actions;

export const selectAddForm = (state: RootState) => state.addForm;

export default addFormSlice.reducer;
