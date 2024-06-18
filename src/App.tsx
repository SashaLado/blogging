import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import Registr from "./components/registr/Registr";
import NewPost from "./components/new-post/NewPost";
import EditPost from './components/edit-post/EditPost';
import ProtectedRoute from './components/ProtectedRoute';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './state/state';

import './App.scss';

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
        path: '/register',
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
