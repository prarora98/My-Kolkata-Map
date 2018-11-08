import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p className="attribute" tabIndex="0">
          Create by Arshi using Google Maps &
          <a className="link" href="https://developer.foursquare.com/">
            FourSquare API
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;