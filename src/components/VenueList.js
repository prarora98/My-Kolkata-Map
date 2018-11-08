import React from "react";
import "../App.css";
import { slide as Menu } from "react-burger-menu";
/*
        Line 17:create a list item for each venue in our array
                         
        Line 18:created key prop because each child in an iterator or array should have unique key property
              */
class VenueList extends React.Component {
  clickListName = venueName => {
    this.props.markers.map(marker => {
      if (marker.title === venueName) {
        window.google.maps.event.trigger(marker, "click");
      }
    });
  };

  /*documentation for hamburger menu:https://www.npmjs.com/package/react-burger-menu*/
  render() {
    return (
      <Menu
        width={"300px"}
        isOpen
        noOverlay
        tabIndex="0"
        aria-label="Menu"
        aria-controls="navigation"
        aria-expanded="false"
      >
        <div className="venue-list">
          <h2 className="heading" tabIndex="0">
            Best Food Outlets in Kolkata
          </h2>
          <input
            className="input-data"
            type="search"
            placeholder="Filter location"
            aria-labelledby="Search Venue"
            value={this.props.query}
            onChange={event => this.props.updateQuery(event.target.value)}
          />
          <ol className="viewer" aria-labelledby="List of venues">
            {this.props.venues.map(myCity => (
              <li
                className="view"
                key={myCity.venue.id}
                role="button"
                //accessVenues={this.props.accessVenues}
                tabIndex="0"
                onClick={() => {
                  this.clickListName(myCity.venue.name);
                }}
                aria-labelledby="Restaurant"
              >
                {myCity.venue.name}
              </li>
            ))}
          </ol>
        </div>
      </Menu>
    );
  }
}

export default VenueList;