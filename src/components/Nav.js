import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink
            to='/'
            className='nav-link'
            activeClassName='nav-link-active'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            className='nav-link'
            activeClassName='nav-link-active'
          >
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;