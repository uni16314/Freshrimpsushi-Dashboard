import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './Sidebar.scss';

const menus = [
  // { idx: 1, title: '홈', link: '/' },
  { idx: 2, title: '포스트댓글', link: '/post' },
];

const SidebarList = () => {
  return (
    <ul className="sidebar-list">
      {menus.map((menu) => (
        <SidebarListItem title={menu.title} link={menu.link} key={menu.idx} />
      ))}
    </ul>
  );
};

const SidebarListItem = ({ title, link }) => {
  return (
    <li className="sidebar-list-item">
      <NavLink to={link} className={({ isActive }) => (isActive ? 'active' : '')}>
        {title}
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  if (!auth.isLogin) {
    return null;
  }

  const handleClick = () => {
    setAuth({
      userId: '',
      isLogin: false,
    });
    sessionStorage.removeItem('userId');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <Link to="/post">
          <img src={require('../../assets/img/logo.png')} alt="logo" />
        </Link>
      </div>
      <SidebarList />
      <button className="sidebar-logout" onClick={handleClick}>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;
