import React from 'react';

export default function PlaceList({ places }) {
  return (
    <ul>
      {places.map((place, index) => (
        <li key={index}>
          <strong>{place.name}</strong> <br /> {place.vicinity}
        </li>
      ))}
    </ul>
  );
}
