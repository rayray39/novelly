import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Footer from './Footer';
import Body from './Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalogue from './Catalogue';
import AdminPage from './AdminPage';
import Borrowed from './Borrowed';
import Wishlist from './Wishlist';
import Account from './Account';
import CreateAccount from './CreateAccount';
import { UserProvider } from './UserContext';


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
      <Route path='/borrowed' element={<Borrowed/>} />
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path='/account' element={<Account/>} />
      <Route path='/admin-page' element={<AdminPage/>} />
      <Route path='/create-account' element={<CreateAccount/>} />
    </Routes>
  </BrowserRouter>
}

root.render(
  <UserProvider>
    <MainApp />
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
