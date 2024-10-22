import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Books from './pages/Books';
import BookUpload from './pages/BookUpload';
import FullBookView from './pages/FullBookView';
import Writes from './pages/Writes';
import WritesUpload from './pages/WritesUpload';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/bookUpload' element={<BookUpload/>}></Route>
        <Route path='/fullBookView/:id' element={<FullBookView/>}></Route>
        <Route path='/writes' element={<Writes/>}></Route>
        <Route path='/writesUpload' element={<WritesUpload/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
