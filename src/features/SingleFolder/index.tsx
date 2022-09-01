import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetId, selectAddForm, setId } from "../addForm/addFormSlice";
import List from "../List";

const SingleFolder = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const addForm = useAppSelector(selectAddForm);
    const folderData = addForm.folders.find((folder) => folder.id === id);

    useEffect(() => {
      dispatch(setId(id || ""));
  });

    useEffect(() => {
        return () => {
            dispatch(resetId());
        };
    }, []);
    return (
        <div>
            <h1 className={styles.folderName}>
                {folderData?.name}
            </h1>
            <List folderData={folderData} />
        </div>
    );
};

export default SingleFolder;
