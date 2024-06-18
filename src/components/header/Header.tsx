import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchAllPosts } from '../../api/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuthStore from '../../state/state';

const SERVER_URL = 'http://localhost:3000/posts'

const Header = () => {
  const {logout, isLoggedIn} = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          <h2>MyBlog</h2>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to='/post/new' className='newPostBtn'>
            New Post
          </Link>
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>log out</button>
        ) : (
          <>
            <Link to="/login" className='logo'>
              Login
            </Link>
            <Link to="/register" className='logo'>
              Registration
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
