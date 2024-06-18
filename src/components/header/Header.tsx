import React from 'react';
import { Link } from "react-router-dom";
import useAuthStore from '../../state/state';

import './Header.scss';
import { toast } from 'react-toastify';

const mainClass = 'header';

const Header = () => {
  const {logout, isLoggedIn} = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('You have logged out successfully!')
  }

  return (
    <header className={mainClass}>
      <nav className={`${mainClass}__container container`}>
        <div className={`${mainClass}__left`}>
          <Link to='/' className={`${mainClass}__logo`}>
            Blogging
          </Link>
          {isLoggedIn && (
            <Link to='/post/new' className="link">
              New Post +
            </Link>
          )}
        </div>
        <div className={`${mainClass}__right`}>
          {isLoggedIn ? (
            <button className={'button'}  onClick={handleLogout}>log out</button>
          ) : (
            <>
              <Link to="/login" className='button button_bordered'>
                Login
              </Link>
              <Link to="/register" className='button'>
                Registration
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
