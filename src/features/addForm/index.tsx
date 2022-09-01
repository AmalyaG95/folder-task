import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addFile, addFolder, selectAddForm } from './addFormSlice';
import { setErrorMessage, setSuccessMessage } from '../../app/globalSlice';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const AddForm = () => {
  const dispatch = useAppDispatch(); 
  const [name, setName] = useState('');
  const addForm = useAppSelector(selectAddForm);

  const handleAddFolder = () => {
    if (!name) {
      dispatch(setErrorMessage('Please give the folder a name'));
      return;
    } 
    if (addForm.currentParamsId) {
      const parentFolderData = addForm.folders.find(folder => folder.id === addForm.currentParamsId);
      if (parentFolderData?.children.folders.find(folder => folder.name === name)) {
        dispatch(setErrorMessage('Please give the folder other name'));
        return;
      } 
    } else if (addForm.folders.find(folder => folder.name === name)) {
        dispatch(setErrorMessage('Please give the folder other name'));
        return;      
    }  

    const folderData = {
      id: uuidv4(),
      name,
      parentId: addForm.currentParamsId || '',
      children: {
        folders: [],
        files: [],
      },
    };

    dispatch(addFolder(folderData));
    dispatch(setSuccessMessage('The Folder was added successfully!!!'));
    setName('');
  }

  const handleAddFile = () => {
    if (!name) {
      dispatch(setErrorMessage('Please give the file a name'));
      return;
    }
    if (addForm.currentParamsId) {
      const parentFolderData = addForm.folders.find(folder => folder.id === addForm.currentParamsId);

      if (parentFolderData?.children.files.find(folder => folder.name === name)) {
        dispatch(setErrorMessage('Please give the file other name'));
        return;
      } 
    } else if (addForm.files.find(files => files.name === name)){
      dispatch(setErrorMessage('Please give the file other name'));
       return;
    }     

    const fileData = {
      id: uuidv4(),
      name,
      parentId: addForm.currentParamsId || '',
      content: '',
    };
    dispatch(addFile(fileData));
    dispatch(setSuccessMessage('The File was added successfully!!!'));
    setName('');
  }

  return (
    <>
     <div className={styles.container}>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
        <button onClick={handleAddFolder}>Add Folder</button>
        <button onClick={handleAddFile}>Add File</button>
        <Link to={'./trash'}><FaTrash /></Link>
      </div>
    </>
  )
}

export default AddForm;
