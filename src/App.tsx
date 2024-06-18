import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import Registr from "./components/registr/Registr";
import NewPost from "./components/new-post/NewPost";
import EditPost from './components/edit-post/EditPost';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import useAuthStore from './state/state';

const queryClient = new QueryClient()

function App() {
  const {login} = useAuthStore()

  useEffect(() => {
    login()
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registr' element={<Registr />} />
          <Route path='/post/:slug' element={<Post />} />
          <Route path='/post/new' element={<NewPost />} />
          <Route path='/post/edit/:slug' element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
