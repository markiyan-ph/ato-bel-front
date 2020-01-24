import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./header.scss";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ title, link, click }) => {
  return (
    <li key={title}>
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
    { title: t("header.menu.home"), link: "/", click: null },
    { title: t("header.menu.gallery"), link: "/people/", click: null },
    { title: t("header.menu.contacts"), link: "/contacts/", click: null }
    // { title: t("header.menu.language"), link: "#", click: switchLanguage }
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
    <header className="header d-flex justify-content-end">
      <ul className="d-flex">
        {menu}
        <LanguageSwitcher
          title={t("header.menu.language")}
          link={"#"}
          click={switchLanguage}
        />
      </ul>
    </header>
  );
};

export default Header;
