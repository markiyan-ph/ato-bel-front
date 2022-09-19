import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Facebook, Instagram, Behance } from 'react-bootstrap-icons';

import SubMenu from './sub-menu';
import logo from '../../assets/images/atoBelLogo.svg';
import './header.scss';
import MainMenu from './main-menu';
import { hideHeaderSubMenu } from '../../tools/helpers';
import { Button } from 'react-bootstrap';

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
  const { pathname } = useLocation();
  const {isAdmin} = useSelector(state => state.authorization);

  const autorize = () => {
    dispatch(actions.authorizeUser());
  };

  const unAutorize = () => {
    dispatch(actions.unAuthorizeUser());
  };

  // lang "uk" or "en"
  const switchLanguage = lang => {
    if (lang !== language) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  };

  const menuItems = [
    { title: t('header.menu.projects'), link: '/projects/', click: null },
    { title: t('header.menu.studio'), link: '/studio/', click: null },
    // { title: t("header.menu.blog"), link: "/blog/", click: null },
    { title: t('header.menu.contacts'), link: '/contacts/', click: null },
  ];

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

  return (
    <header className={`header ${hideHeaderSubMenu(pathname) ? '' : 'expand'}`}>
      <div className="header-block d-flex align-items-center">
        <div className="logo-container">
          <LinkMenu content={<Logo />} title="company-logo" link={'/'} click={null} className="home-link mr-auto" />
        </div>

        <div className="menu">
          <MainMenu menuItems={menuItems} />
          <SubMenu pathname={pathname} />
        </div>

        <div className="language-container d-flex align-items-center">
          <div className="d-flex align-items-center">
            <LinkMenu content="UA" title="UA" link={'#'} className={language === 'uk' ? 'is-active' : ''} click={() => switchLanguage('uk')} /> &nbsp;/&nbsp;
            <LinkMenu content="EN" title="EN" link={'#'} className={language === 'en' ? 'is-active' : ''} click={() => switchLanguage('en')} />
          </div>

          <div className="social-networks d-flex align-items-center">{socialNetworks}</div>
          <Button 
            size='sm'
            variant={isAdmin ? 'warning' : 'primary'}
            onClick={() => {
              isAdmin ? unAutorize() : autorize();
            }}
          >
            {isAdmin ? 'Logout' : 'Login'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
