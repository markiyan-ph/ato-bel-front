import React from 'react';

import fbIcon from '../../assets/images/facebook-icon.png';
import twIcon from '../../assets/images/twitter-icon.png';
import emailIcon from '../../assets/images/mail-icon.png';
import './footer.scss';

const Footer = () => {
  const iconWidth = "20";

  return (
    <div className="footer d-flex flex-column align-items-center justify-content-center">
      <p>розроблено 2020р. ......... всякі інші штуки</p>
      <div className="d-flex">
        <a href="https://www.facebook.com/atobeldesign/"><img src={fbIcon} alt="fb-icon" width={iconWidth} /></a>
        <a href="https://www.facebook.com/atobeldesign/"><img src={twIcon} alt="tw-icon" width={iconWidth} /></a>
        <a href="https://www.facebook.com/atobeldesign/"><img src={emailIcon} alt="email-icon" width={iconWidth} /></a>
      </div>
    </div>
  );
};

export default Footer;