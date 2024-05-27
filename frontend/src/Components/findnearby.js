import React, { useState, useEffect, useRef } from 'react';
import PlaceList from './PlaceList';

export default function FindNearby() {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const locationInputRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&callback=initMap&libraries=places";
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);
  

    return () => {
      document.body.removeChild(script);
    };
  }, []);;

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 12
    });
    setMap(mapInstance);

    const autocompleteInstance = new window.google.maps.places.Autocomplete(locationInputRef.current);
    autocompleteInstance.bindTo('bounds', mapInstance);
    setAutocomplete(autocompleteInstance);
  };

  const searchPlaces = () => {
    const location = locationInputRef.current.value;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, function (results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        const request = {
          location: results[0].geometry.location,
          radius: '5000',
          types: ['pet_store', 'veterinary_care']
        };
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, function (results, status) {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          } else {
            alert('No places found nearby.');
          }
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const createMarker = (place) => {
    const marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    const infowindow = new window.google.maps.InfoWindow({
      content: '<strong>' + place.name + '</strong><br>' + place.vicinity
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  };

  return (
    <div>
      <h1>Find Dog Vets and Stores Nearby</h1>
      <div>
        <label htmlFor="location">Enter your location:</label>
        <input type="text" id="location" ref={locationInputRef} />
        <button onClick={searchPlaces}>Search</button>
      </div>
      <div id="map" style={{ height: '400px', width: '100%', marginBottom: '20px' }}></div>
      <h2>Nearby Places</h2>
      <PlaceList places={places} />
    </div>
  );
}

