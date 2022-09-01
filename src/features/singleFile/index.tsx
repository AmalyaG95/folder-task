import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveFileContent, selectAddForm } from '../addForm/addFormSlice';
import { selectSingleFile, setContent, setEditableFile } from '../singleFile/singleFileSlice';
import { setSuccessMessage } from '../../app/globalSlice';
import { IFile } from '../addForm/types';

const SingleFile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const addForm = useAppSelector(selectAddForm);
  const { editableFile } = useAppSelector(selectSingleFile);

  useEffect(() => {
    let fileData = addForm.files.find(file => file.id === id) as IFile;

    if (!fileData) {
      for (let i = 0; i < addForm.folders.length; i++) {
        fileData = addForm.folders[i].children.files.find(file => file.id === id) as IFile;
        if (fileData) break;
      }
    }
    dispatch(setEditableFile(fileData));
  }, [addForm.files, addForm.folders, id])

  const handleSave = () => {
    dispatch(setSuccessMessage(''));
    dispatch(saveFileContent({content: editableFile.content, fileId: editableFile.id}));
    dispatch(setSuccessMessage('The file was saved successfully!!!'));
    // dispatch(setSuccessMessage(''));
    // setContent('')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.fileName}>{editableFile.name}</h1>
      <textarea name="" id="" value={editableFile.content} onChange={(e) => dispatch(setContent(e.target.value))} />
      <button className={styles.saveButton} onClick={handleSave}>Save changes</button>
    </div>
  )
}

export default SingleFile;
