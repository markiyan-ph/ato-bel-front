import React from 'react';
import { hideHeaderSubMenu } from '../../../tools/helpers';

import './sub-menu.scss';

const menuList = [
  { title: 'google', link: 'https://www.google.com.ua/' },
  { title: 'weather', link: 'https://weather.com/' },
  { title: 'youtube', link: 'https://www.youtube.com/' },
  { title: 'maps', link: 'https://www.google.com.ua/maps' },
  { title: 'github', link: 'https://github.com/' },
];

const menu = menuList.map(({title, link}) => (
  <li key = {title}>
    <a title = {title} className = "" href = {link}>
      {title}
    </a>
  </li>
));

const SubHeader = ({ pathname }) => (
  <div className={`submenu-block ${hideHeaderSubMenu(pathname) ? 'hide-block' : ''}`}>
    <ul className="d-flex align-items-center">{menu}</ul>
  </div>
);

export default SubHeader;