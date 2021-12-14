import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/Home';
import NotFound from './components/NotFound';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import DefaultLayout from './components/containers/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfilePage from './components/Auth/Profile';
import ProductListPage from './components/Products/List';
import AddProductPage from './components/Products/Add';
import EditProductPage from './components/Products/Edit';
import { useTypedSelector } from './hooks/useTypedSelector';
function App() {
  const { isAuth } = useTypedSelector((redux) => redux.auth);
  return (
    <>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='colored' />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          {isAuth && <>
            <Route path="profile" element={<UserProfilePage />}></Route>
            <Route path="products/list" element={<ProductListPage />}></Route>
            <Route path="products/add" element={<AddProductPage />}></Route>
            <Route path="products/edit" element={<EditProductPage />}></Route>
          </>}
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
