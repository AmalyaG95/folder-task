export interface IFile {
    id: string;
    name: string;
    parentId: string;
    content: string;
}

export interface IFolder {
    id: string;
    name: string;
    children: IChildren;
    parentId: string;
}

export interface IChildren {
    folders: IFolder[];
    files: IFile[];
}

export interface IAddFormState {
    folders: IFolder[];
    files: IFile[];
    trash: IChildren;
    currentParamsId: string;
}

export interface IFolderPayload {
    folderId: string;
    parentId: string;
}

export interface IFilePayload {
    fileId: string;
    parentId: string;
}

export interface IFileSavePayload {
    fileId: string;
    content: string;
}
  