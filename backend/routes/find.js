
const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/find-nearby', async (req, res) => {
  const location = req.query.location;

  const options = {
    hostname: 'maps.googleapis.com',
    port: 443,
    path: `/maps/api/place/nearbysearch/json?location=${location}&radius=5000&types=pet_store|veterinary_care&key=YOUR_GOOGLE_MAPS_API_KEY`,
    method: 'GET'
  };

  const request = https.request(options, response => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const responseData = JSON.parse(data);

        const nearbyPlaces = responseData.results.map(place => ({
          name: place.name,
          vicinity: place.vicinity
        }));

        res.json({ places: nearbyPlaces });
      } catch (error) {
        console.error('Error parsing response:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });

 
  request.on('error', error => {
    console.error('Error making request:', error);
    res.status(500).json({ error: 'Internal server error' });
  });


  request.end();
});

module.exports = router;
