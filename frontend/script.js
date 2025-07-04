const map = L.map('map').setView([17.385044, 78.486671], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = null;
let polyline = L.polyline([], { color: 'blue' }).addTo(map);

let index = 0;
let route = [];

// Fetch dummy data
fetch('http://localhost:5000/api/vehicle')
  .then(res => res.json())
  .then(data => {
    route = data;
    marker = L.marker([route[0].latitude, route[0].longitude]).addTo(map);

    setInterval(() => {
      if (index < route.length) {
        const { latitude, longitude } = route[index];
        marker.setLatLng([latitude, longitude]);
        polyline.addLatLng([latitude, longitude]);
        map.setView([latitude, longitude]);
        index++;
      }
    }, 2000);
  });
