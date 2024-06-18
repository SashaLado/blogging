import React from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Auth from "./components/auth/Auth";
import NewPost from "./components/new-post/NewPost";
import EditPost from './components/edit-post/EditPost';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/post/:slug' element={<Post />} />
          <Route path='/post/new' element={<NewPost />} />
          <Route path='/post/edit/:slug' element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
