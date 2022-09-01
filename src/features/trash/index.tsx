import { FaFile, FaFolder, FaTimes, FaTrashRestore } from "react-icons/fa";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    deleteFilePermanently,
    deleteFolderPermanently,
    restoreFile,
    restoreFolder,
    selectAddForm,
} from "../addForm/addFormSlice";
import { setErrorMessage, setSuccessMessage } from "../../app/globalSlice";

const Trash = () => {
    const addForm = useAppSelector(selectAddForm);
    const dispatch = useAppDispatch();

    const handleDeleteFolder = (folderId: string) => {
        dispatch(deleteFolderPermanently(folderId));
    };

    const handleRestoreFolder = (folderId: string, parentId: string, folderName: string) => {
        if ((!addForm.folders.find(folder => folder.id === parentId) && parentId !== '') || addForm.folders.find(folder => folder.id === parentId)?.children.folders.some(folder => folder.name === folderName)) {
            dispatch(setErrorMessage("The folder can't be restored"));
            return;
        } 
        dispatch(restoreFolder({folderId, parentId}));
        dispatch(setSuccessMessage("The folder was restored successfully!!!"));
    };

    const handleDeleteFile = (fileId: string) => {
        dispatch(deleteFilePermanently(fileId));
    };

    const handleRestoreFile = (fileId: string, parentId: string, fileName: string) => {
        if ((!addForm.folders.find(folder => folder.id === parentId) && parentId !== '') || addForm.folders.find(folder => folder.id === parentId)?.children.files.some(file => file.name === fileName)) {
            dispatch(setErrorMessage("The file can't be restored"));
            return;
        } 
        dispatch(restoreFile({fileId, parentId}));
        dispatch(setSuccessMessage("The file was restored successfully!!!"));
    };

    return (
        <div className={styles.container}>
            <h1>Trash</h1>
            {!!addForm.trash.folders.length && <h2>Folders</h2>}
            <div className={styles.foldersWrapper}>
                {addForm.trash.folders.map((folder) => (
                    <div key={folder.id} className={styles.wrapper}>
                        <div className={styles.actions}>
                            <FaTrashRestore
                                onClick={() => handleRestoreFolder(folder.id, folder.parentId, folder.name)}
                            />
                            <FaTimes
                                className={styles.deleteButton}
                                onClick={() => handleDeleteFolder(folder.id)}
                            />
                        </div>
                        <div>
                            <FaFolder className={styles.folderIcon} />
                            {folder.name}
                        </div>
                    </div>
                ))}
            </div>
            {!!addForm.trash.files.length && <h2>Files</h2>}
            <div className={styles.filesWrapper}>
                {addForm.trash.files.map((file) => (
                    <div key={file.id} className={styles.wrapper}>
                        <div className={styles.actions}>
                            <FaTrashRestore
                                onClick={() => handleRestoreFile(file.id, file.parentId, file.name)}
                            />
                            <FaTimes
                                className={styles.deleteButton}
                                onClick={() => handleDeleteFile(file.id)}
                            />
                        </div>
                        <div>
                            <FaFile className={styles.fileIcon} />
                            {file.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trash;
