import React, { useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import logo from "../../assets/images/fbLogoTrans.png";
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

const Header = ({ location: { pathname } }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const switchLanguage = () => {
    i18n.changeLanguage(language === "uk" ? "en" : "uk");
    setLanguage(language => (language === "uk" ? "en" : "uk"));
  };

  const menuItems = [
    { title: t("header.menu.projects"), link: "/projects/", click: null },
    { title: t("header.menu.workshop"), link: "/workshop/", click: null },
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
      <div className="logo">
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className={`menu ${(pathname === '/' || pathname ===  '/newMain/') ? '' : 'underscore'}`}>
        <ul className="d-flex align-items-baseline">
          <LinkMenu
            title={t("header.menu.home")}
            link={"/"}
            click={null}
            className="home-link mr-auto"
          />
          {menu}
        </ul>
      </div>
      <div className="language">
        <ul>
          <LinkMenu
            title={t("header.menu.language")}
            link={"#"}
            click={switchLanguage}
            className="language-selector ml-3"
          />
        </ul>
      </div>
    </header>
  );
};

export default withRouter(Header);
