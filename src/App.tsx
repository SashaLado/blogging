import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import Registr from "./components/registr/Registr";
import NewPost from "./components/new-post/NewPost";
import EditPost from './components/edit-post/EditPost';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import useAuthStore from './state/state';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient()

function App() {
  const {login, isLoggedIn} = useAuthStore()

  useEffect(() => {
    login()
  }, []);


  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
        index: true
      },
      {
        path: '/login',
        element: <Login />,
        index: true
      },
      {
        path: '/registr',
        element: <Registr />,
        index: true
      },
      {
        path: '/post/:slug',
        element: <Post />,
        index: true
      },
      {
        element: <ProtectedRoute isAuthenticated={isLoggedIn} />,
        children: [
          {
            path: '/post/new',
            element: <NewPost />
          },
          {
            path: '/post/edit/:slug',
            element: <EditPost />
          }
        ]
      },
      {
        path: '*',
        element: <p>404 Error - Nothing here...</p>
      }
    ]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored"></ToastContainer>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
