import React from "react";

import fbIcon from "../../assets/images/facebook-icon.png";
import bhIcon from "../../assets/images/behance-icon.png";
import emailIcon from "../../assets/images/mail-icon.png";
import "./footer.scss";

const Footer = () => {
  const iconWidth = "20";

  return (
    <div className="footer">
      <div className="footer-container d-flex flex-column align-items-center justify-content-center">
        <p>розроблено 2020р. ......... всякі інші штуки</p>
        <div className="d-flex">
          <a href="https://www.facebook.com/atobeldesign/">
            <img src={fbIcon} alt="fb-icon" width={iconWidth} />
          </a>
          <a href="https://www.behance.net/Andriy_Byelyayev">
            <img src={bhIcon} alt="behance-icon" width={iconWidth} />
          </a>
          <a href="https://www.facebook.com/atobeldesign/">
            <img src={emailIcon} alt="email-icon" width={iconWidth} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
