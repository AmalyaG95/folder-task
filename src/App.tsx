import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddForm from './features/addForm';
import List from './features/List';
import SingleFolder from './features/SingleFolder';
import SingleFile from './features/singleFile';
import { selectGlobal, setErrorMessage, setSuccessMessage } from './app/globalSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Trash from './features/trash';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {successMessage, errorMessage} = useAppSelector(selectGlobal);

  useEffect(() => {
    successMessage &&
      toast.success(successMessage);
      dispatch(setSuccessMessage(''));
  }, [successMessage]);
  
  useEffect(() => {
    errorMessage &&
      toast.error(errorMessage);
      dispatch(setErrorMessage(''));
  }, [errorMessage]);

  return (
    <div className="App">
      {
          (!location.pathname.includes('file') && !location.pathname.includes('trash')) && <AddForm />
          
      } 
      <Routes>
        <Route
          path={'/'}
          element={<List />}
        />
        <Route
          path={'/folder/:id'}
          element={<SingleFolder />}
        />
        <Route
          path={'/file/:id'}
          element={<SingleFile />}
        />
        <Route
          path={'/trash'}
          element={<Trash />}
        />
      </Routes>
      <footer>
        {<ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />}
      </footer>
    </div>
  );
}

export default App;
