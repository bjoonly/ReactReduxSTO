import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/Home';
import NotFound from './components/NotFound';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import DefaultLayout from './components/containers/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
