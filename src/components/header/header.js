import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Behance } from '../social-icons';

import "./header.scss";
import logo from "../../assets/images/atoBelLogo.svg";

const LinkMenu = ({ content, title, link, click, className='' }) => {
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
  const { pathname } = useLocation();

  // lang "uk" or "en"
  const switchLanguage = (lang) => {
    if (lang !== language) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  };

  const menuItems = [
    { title: t("header.menu.projects"), link: "/projects/", click: null },
    { title: t("header.menu.studio"), link: "/studio/", click: null },
    // { title: t("header.menu.blog"), link: "/blog/", click: null },
    { title: t("header.menu.contacts"), link: "/contacts/", click: null }
  ];

  const menu = menuItems.map(({ title, link, click }) => {
    return (
      <li key={title}>
        <NavLink
          className={({isActive}) => (isActive ? "is-active" : "")}
          to={link}
          onClick={click}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  
  const listOfSocialNetworks = [
    {icon: <Facebook />, link: 'https://www.facebook.com/atobeldesign', title: 'facebook-icon'}, 
    {icon: <Instagram />, link: 'https://www.instagram.com/ato_bel_architects/', title: 'instagram-icon'}, 
    {icon: <Behance />, link: 'https://www.behance.net/ATO-Bel', title: 'behance-icon'}
  ];
  const socialNetworks = listOfSocialNetworks.map(({icon, link, title}) => {
    return (
      <a href={link} key={title}>
        {icon}
      </a>
    );});
    

  return (
    <header className="header d-flex align-items-center">
      <div className="logo-container">
        <LinkMenu
          content={<Logo />}
          title="company-logo"
          link={"/"}
          click={null}
          className="home-link mr-auto"
        />
      </div>
      
      <div className={`menu ${(pathname === '/' || pathname ===  '/newMain/') ? '' : 'underscore'}`}>
        <ul className="d-flex align-items-center">
          {menu}
        </ul>
      </div>
      
      <div className="language-container d-flex align-items-center">
        <div className="d-flex align-items-center">
          <LinkMenu
            content="UA"
            title="UA"
            link={"#"}
            className={language === 'uk' ? "is-active" : ""}
            click={() => switchLanguage('uk')}
          /> &nbsp;/&nbsp;
          <LinkMenu
            content="EN"
            title="EN"
            link={"#"}
            className={language === 'en' ? "is-active" : ""}
            click={() => switchLanguage('en')}
          />
        </div>

        <div className="social-networks d-flex align-items-center">
          {socialNetworks}
        </div>
      </div>
    </header>
  );
};

export default Header;
