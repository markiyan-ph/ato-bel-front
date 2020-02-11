import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/fbLogoTrans.png';
import "./header.scss";
import { useTranslation } from "react-i18next";

const LinkMenu = ({ title, link, click, className }) => {
  return (
    <li className={className} key={title}>
      <Link to={link} onClick={click}>
        {title}
      </Link>
    </li>
  );
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const switchLanguage = () => {
    i18n.changeLanguage(language === "uk" ? "en" : "uk");
    setLanguage(language => (language === "uk" ? "en" : "uk"));
  };

  const menuItems = [
    { title: t("header.menu.projects"), link: "/projects/", click: null },
    { title: t("header.menu.people"), link: "/people/", click: null },
    { title: t("header.menu.blog"), link: "/blog/", click: null },
    { title: t("header.menu.contacts"), link: "/contacts/", click: null }
  ];

  const menu = menuItems.map(({ title, link, click }) => {
    return (
      <li key={title}>
        <NavLink
          exact={true}
          activeClassName="is-active"
          to={link}
          onClick={click}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  return (
    <header className="header d-flex align-items-center">
      <ul className="d-flex align-items-baseline">
        <li><img src={logo} alt="Logo" width="100" /></li>
        <LinkMenu
          title={t("header.menu.home")}
          link={"/"}
          click={null}
          className="home-link mr-auto"
        />
        {menu}
        <LinkMenu
          title={t("header.menu.language")}
          link={"#"}
          click={switchLanguage}
          className="language-selector ml-3"
        />
      </ul>
    </header>
  );
};

export default Header;
