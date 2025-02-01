
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});
 // Add zoom and rotation controls to the map.
 map.addControl(new mapboxgl.NavigationControl());

// Create a default Marker and add it to the map.
//https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
const popup = new mapboxgl.Popup({ offset: 25 }).setText(campground.title);
const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);