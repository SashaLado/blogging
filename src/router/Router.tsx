import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../components/home/Home';
import NewPost from '../components/new-post/NewPost';
import EditPost from '../components/new-post/NewPost';
import Registr from '../components/registr/Registr';
import Post from '../components/post/Post';
import Login from '../components/login/Login';
import ProtectedRoute from './ProtectedRoute';
import useAuthStore from '../state/state';

