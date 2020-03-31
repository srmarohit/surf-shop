/* 
 const mbxClient = require('@mapbox/mapbox-sdk');
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ' });


 baseClient.forwardGeocode({
  query: 'Paris, France',
  limit: 2
})
  .send()
  .then((response,err) => {
    const match = response.body;
    console.log(match);
  });

*/
  //geocoding

  const request = require('request');
const place = 'dallas texas us' ;
const mapboxGeocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=1&access_token=pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ` ;

request({ url: mapboxGeocodeUrl, json: true }, (error, Response) => {
    if (error) { //this errorr will only show if there is no internet connection
        console.log('check your internet conection..');
    } else if (Response.body.features.length == 0) { // this error will be shown if our query search of an address, country or etc. is nowhere to be found
        console.log('check your query to determine the area, we cannot return the information!');
    } else {
        const longitude = Response.body.features[0].center[0];
        const latitude = Response.body.features[0].center[1];
           //     const city = Response.body.features[0].context[0].text;
              //  const state = Response.body.features[0].context[1].text;
              //  const country = Response.body.features[0].context[2].text;

        console.log('longitude => ' + longitude);
        console.log('latitude => ' + latitude);
             //   console.log(city+" "+state+" "+country);

    }
});


// This file is used for only Testing Purpose..