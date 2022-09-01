import { FaFile, FaFolder, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteFile, deleteFolder, selectAddForm } from "../addForm/addFormSlice";
import { IFolder } from "../addForm/types";

interface IListProps {
    folderData?: IFolder;
}

const List = ({ folderData }: IListProps) => {
    const dispatch = useAppDispatch();
    const addForm = useAppSelector(selectAddForm);
    const childFolders = addForm.folders.filter(
        (folder) =>
            folder.parentId === folderData?.id ||
            (!folderData && folder.parentId === "")
    );

    const handleDeleteFolder = (folderId: string) => {
        dispatch(deleteFolder({folderId, parentId: folderData?.id || ''}));
    }

    const handleDeleteFile = (fileId: string) => {
        dispatch(deleteFile({fileId, parentId: folderData?.id || ''}));
    }
    
    return (
        <div className={styles.container}>
            {!!childFolders.length && <h2>Folders</h2>}
            <div className={styles.foldersWrapper}>
                {childFolders.map((folder) => (
                    <div key={folder.id} className={styles.wrapper}>
                        <FaTimes className={styles.deleteButton} onClick={() => handleDeleteFolder(folder.id)}/>
                        <Link to={`/folder/${folder.id}`}>                            
                            <FaFolder />
                            {folder.name}
                        </Link>
                    </div>
                ))}
            </div>
            {((folderData && !!folderData?.children.files?.length) || (!folderData && !!addForm.files.length)) && <h2>Files</h2>}
            <div className={styles.filesWrapper}>
                {folderData ? folderData?.children.files?.map((file) => (
                    <div key={file.id} className={styles.wrapper}>
                        <FaTimes className={styles.deleteButton} onClick={() => handleDeleteFile(file.id)}/>
                        <Link to={`/file/${file.id}`}>                            
                            <FaFile />
                            {file.name}
                        </Link>
                    </div>
                )) : addForm.files.map((file) => (
                    <div key={file.id} className={styles.wrapper}>
                        <FaTimes className={styles.deleteButton} onClick={() => handleDeleteFile(file.id)}/>
                        <Link to={`/file/${file.id}`}>                            
                            <FaFile />
                            {file.name}
                        </Link>
                    </div>))}
            </div>
        </div>
    );
};

export default List;
