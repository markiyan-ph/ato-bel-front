import React from 'react';
import { NavLink } from 'react-router-dom';

import './main-menu.scss';

const MainMenu = ({menuItems}) => {
  const menu = menuItems.map(({ title, link, click }) => {
    return (
      <li key={title}>
        <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to={link} onClick={click} title={title}>
          {title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="main-menu">
      <ul className="d-flex align-items-center">{menu}</ul>
    </div>
  );

};

export default MainMenu;