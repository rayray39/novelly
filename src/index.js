import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Footer from './Footer';
import Body from './Body';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Catalogue from './Catalogue';


const root = ReactDOM.createRoot(document.getElementById('root'));

function LoginPage() {
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}

function MainApp() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/catalogue' element={<Catalogue/>} />
    </Routes>
  </BrowserRouter>
}

root.render(
  <MainApp />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
