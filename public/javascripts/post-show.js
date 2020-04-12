mapboxgl.accessToken = 'pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: post.geometry.coordinates,
  zoom: 5
});

// create a HTML element for our post location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);


$('.review-edit-button').on('click',function(){
      $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit') ; 
      // toggle form
      $(this).siblings('.edit-review-form').toggle();
});

$('.clear-rating').click(function(){
	$(this).siblings('.input-no-rate').click();
});