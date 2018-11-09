import React from "react";
//https://javascriptplayground.com/functional-stateless-components-react/
// changed to functional stateless components
const Footer= function(props){
    
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


export default Footer;
