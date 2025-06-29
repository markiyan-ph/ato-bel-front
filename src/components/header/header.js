import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Facebook, Instagram, Behance } from 'react-bootstrap-icons';

import SubMenu from './sub-menu';
import logo from '../../assets/images/atoBelLogo.svg';
import './header.scss';
import MainMenu from './main-menu';
import { hideHeaderSubMenu } from '../../tools';
import { Button, ButtonGroup } from 'react-bootstrap';

const LinkMenu = ({ content, title, link, click, className = '' }) => {
  content = content ?? title;
  return (
    <Link to={link} onClick={click} key={title} className={className}>
      {content}
    </Link>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <div>
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, isAuthorized, isMainAdmin, loginScreenCode } = useSelector(state => state.authorization);
  const storageKey = localStorage.getItem(import.meta.env.VITE_REACT_APP_STORAGE_VARIABLE);

  const autorize = () => {
    // dispatch(actions.authorizeUser());
    navigate('/login', { state: { from: location }, replace: true });
  };

  const unAutorize = () => {
    dispatch(actions.unAuthorizeUser());
  };

  const userPreview = () => {
    dispatch(actions.userPreview());
  };

  const userAdmin = () => {
    dispatch(actions.userAdmin());
  };

  // lang "uk" or "en"
  const switchLanguage = lang => {
    if (lang !== language) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  };

  const menuItems = () => {
    const items = [
      { title: t('header.menu.projects'), link: '/projects/', click: null },
      { title: t('header.menu.studio'), link: '/studio/', click: null },
      // { title: t("header.menu.blog"), link: "/blog/", click: null },
      { title: t('header.menu.contacts'), link: '/contacts/', click: null },
    ];

    if (isAuthorized && isAdmin && isMainAdmin) {
      items.push({ title: t('header.menu.userManagement'), link: '/user-management/', click: null });
    }

    return items;
  };

  const listOfSocialNetworks = [
    {
      icon: <Facebook size={16} />,
      link: 'https://www.facebook.com/atobeldesign',
      title: 'facebook-icon',
    },
    {
      icon: <Instagram size={16} />,
      link: 'https://www.instagram.com/ato_bel_architects/',
      title: 'instagram-icon',
    },
    {
      icon: <Behance size={16} />,
      link: 'https://www.behance.net/ATO-Bel',
      title: 'behance-icon',
    },
  ];
  const socialNetworks = listOfSocialNetworks.map(({ icon, link, title }) => {
    return (
      <a href={link} key={title}>
        {icon}
      </a>
    );
  });

  const buttonsGroup = (
    <ButtonGroup aria-label="Admin buttons" className="adminButtons">
      {isAuthorized ? (
        <Button
          size="sm"
          variant={isAdmin ? 'warning' : 'primary'}
          onClick={() => {
            isAdmin ? userPreview() : userAdmin();
          }}
        >
          {isAdmin ? 'Preview' : 'Admin'}
        </Button>
      ) : null}
      <Button
        size="sm"
        variant="warning"
        onClick={() => {
          isAuthorized ? unAutorize() : autorize();
        }}
      >
        {isAuthorized ? 'Logout' : 'Login'}
      </Button>
    </ButtonGroup>
  );

  return (
    <header className={`header ${hideHeaderSubMenu(location.pathname) ? '' : 'expand'}`}>
      <div className="header-block d-flex align-items-center">
        <div className="logo-container">
          <LinkMenu content={<Logo />} title="company-logo" link={'/'} click={null} className="home-link mr-auto" />
        </div>

        <div className="menu">
          <MainMenu menuItems={menuItems()} />
          <SubMenu pathname={location.pathname} />
        </div>

        <div className="language-container d-flex align-items-center">
          <div className="language-selector d-flex align-items-center">
            <LinkMenu
              content="UA"
              title="UA"
              link={'#'}
              className={language === 'uk' ? 'is-active' : ''}
              click={() => switchLanguage('uk')}
            />{' '}
            <span>&nbsp;/&nbsp;</span>
            <LinkMenu
              content="EN"
              title="EN"
              link={'#'}
              className={language === 'en' ? 'is-active' : ''}
              click={() => switchLanguage('en')}
            />
          </div>

          <div className="social-networks d-flex align-items-center">{socialNetworks}</div>
          {storageKey === loginScreenCode ? buttonsGroup : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
