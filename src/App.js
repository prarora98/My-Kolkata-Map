import React, { Component } from "react";
import { mapStyles } from "./components/mapStyles.js";
import "./App.css";
import VenueList from "./components/VenueList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/Error";
import axios from "axios";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    venues: [],
    markers: [],
    visibleVenues: [],
    query: "",
    hiddenMarkers: []
  };

  componentDidMount() {
    this.accessVenues();
  }
  //load the google map
  loadMap = () => {
    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBK3OCyi95_CdodbvdkHJGt_Zm8ZO7nnuI&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  // Use four square API to get access venues
  accessVenues = () => {
    const endPoint = " https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "OPAAWOBVDO0ICO5JPEDRDUIOIHYKBOLCGPK3AR1M53Y0X12T",
      client_secret: "PBAOT5LG0UCDFNSZOCEE13VELTIDONP5JPTHXCNQEEOJNGOA",
      query: "food",
      near: "Kolkata",
      v: "20181028",
      limit: 8
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items,
            visibleVenues: response.data.response.groups[0].items
          },
          this.loadMap()
        );
      })
      .catch(error => {
        console.log("error: " + error);
        alert(
          "Sorry! Error occurred whilst loading of from FourSquare API. Locations data will not be displayed"
        );
      });
  };

  //initializing the map L7 4

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 22.567, lng: 88.367 },
      zoom: 12,
      styles: mapStyles
    });

    // create an info window L7 7
    //https://developers.google.com/maps/documentation/javascript/infowindows#add
    //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    var infowindow = new window.google.maps.InfoWindow({
      maxWidth: 200
    });

    this.infowindow = infowindow;

    this.state.venues.map(myCity => {
      var contentString = `<div class="infoWindow">
            <h2>${myCity.venue.name}</h2>
            <h3>Address:${myCity.venue.location.address}</h3>
            <h3>${myCity.venue.location.city}</h3>
            <h3>Pincode:${myCity.venue.location.postalCode}</h3>
        </div>`;

      //Create a marker L7 6
      var marker = new window.google.maps.Marker({
        position: {
          lat: myCity.venue.location.lat,
          lng: myCity.venue.location.lng
        },
        map: map,
        title: myCity.venue.name,
        animation: window.google.maps.Animation.DROP
      });
      // adding animation to the marker
      marker.addListener("click", toggleBounce);
      this.state.markers.push(marker);
      //function to add animation to marker
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 1500);
        }
      }

      marker.addListener("click", function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
    });
  };

  // setting the update query function to
  //filter the markers based on the query in the search box
  updateQuery = query => {
    this.setState({ query: query });
    this.state.markers.map(marker => marker.setVisible(true));
    let filterVenues;
    let hiddenMarkers;

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      filterVenues = this.state.venues.filter(myCity =>
        match.test(myCity.venue.name)
      );
      this.setState({ venues: filterVenues });
      hiddenMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myCity => myCity.venue.name !== marker.title)
      );

      // Hiding the markers for venues which are not selected

      hiddenMarkers.forEach(marker => marker.setVisible(false));

      this.setState({ hiddenMarkers });
    } else {
      this.setState({ venues: this.state.visibleVenues });
      this.state.markers.forEach(marker => marker.setVisible(true));
    }
  };
  render() {
    return (
      <main className="App">
        <ErrorBoundary>
          <Navbar />
          <VenueList
            venues={this.state.venues}
            accessVenues={this.accessVenues}
            markers={this.state.markers}
            query={this.state.query}
            updateQuery={b => this.updateQuery(b)}
          />

          <div id="map" tabIndex="0" role="application" aria-labelledby="Map" />
          <Footer />
        </ErrorBoundary>
      </main>
    );
  }
}
//source is : https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
//loading the script tag for google map
function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onerror = function() {
    document.write("Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}
export default App;