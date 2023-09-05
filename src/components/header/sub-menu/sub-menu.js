import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideHeaderSubMenu, updateDeleteListItem } from '../../../tools';
import * as actions from '../../../store/actions';

import './sub-menu.scss';

// const menuList = [
//   { title: 'google', link: 'https://www.google.com.ua/' },
//   { title: 'weather', link: 'https://weather.com/' },
//   { title: 'youtube', link: 'https://www.youtube.com/' },
//   { title: 'maps', link: 'https://www.google.com.ua/maps' },
//   { title: 'github', link: 'https://github.com/' },
// ];

const SubHeader = ({ pathname }) => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.tagsList);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedTags, setSelectedTags] = useState([]);

  let menu = [];
  let menuList = [];

  useEffect(() => {
    dispatch(actions.fetchTags());
    // if (pathname === '/projects/') {
    //   if (tags.length === 0) {
    //   }

    //   menuList = tags;
    // }
  }, [tags.length]);

  if (pathname === '/projects/') {
    menuList = tags;
    menu = menuList.map(({ tagId, labels }) => (
      <li key={tagId}>
        <a
          title={tagId}
          className={selectedTags.includes(tagId) ? 'is-active' : ''}
          // TODO: move onClick to separate function
          onClick={e => {
            e.preventDefault();
            setSelectedTags(selectedTags =>
              selectedTags.includes(tagId)
                ? updateDeleteListItem(selectedTags, selectedTags.indexOf(tagId))
                : [...selectedTags, tagId]
            );
          }}
        >
          {labels[lang]}
        </a>
      </li>
    ));
  } else {
    menuList = [
      { title: 'google', link: 'https://www.google.com.ua/' },
      { title: 'weather', link: 'https://weather.com/' },
      { title: 'youtube', link: 'https://www.youtube.com/' },
      { title: 'maps', link: 'https://www.google.com.ua/maps' },
      { title: 'github', link: 'https://github.com/' },
    ];

    menuList.map(({ title, link }) => (
      <li key={title}>
        <a title={title} className="" href={link}>
          {title}
        </a>
      </li>
    ));
  }

  return (
    <div className={`submenu-block ${hideHeaderSubMenu(pathname) ? 'hide-block' : ''}`}>
      <ul className="d-flex align-items-center">{menu}</ul>
    </div>
  );
};

export default SubHeader;
