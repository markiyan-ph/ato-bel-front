import React from 'react';
// import Footer from '../../footer';

import './contacts.scss';

const Contacts = () => {
  return (
    <div className="wrapper">
      <div className="contacts d-flex flex-column align-items-center justify-content-center">
        <h3>Проектна Майстерня Бєляєвих</h3>
        <br />
        <h5>м. Львів, вул. Алли Горської 5а</h5>
        <h5>79000, Україна</h5>
        <h5>
          <a href="tel:+380638326925">+38 063 8326925</a>
        </h5>
        <h5>
          <a target="_blank" rel="noopener noreferrer" href="mailto:office@ato-bel.com.ua">
            office@ato-bel.com.ua
          </a>
        </h5>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contacts;
