import {activateForm} from './form.js';
import {renderPopup} from './render-popup.js';

const MapCoordinates = {
  LAT: 35.68949,
  LNG: 139.69171
};

const MAP_SCALE = 10;
const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;
const MAP_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const map = L.map('map-canvas');
const address = document.querySelector('#address');


const onMapLoad = () => {
  activateForm();
  address.value = `${MapCoordinates.LAT} ${MapCoordinates.LNG}`;
};

const layerGroup = L.layerGroup().addTo(map);

const renderMarkers = (ads) => {
  ads.forEach((ad) => {
    const {location} = ad;

    const marker = L.marker({
      lat: location.lat,
      lng: location.lng
    },
    {
      icon: pinIcon
    });

    marker
      .addTo(layerGroup)
      .bindPopup(renderPopup(ad));
  });
};

const loadMap = (data) => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: MapCoordinates.LAT,
      lng: MapCoordinates.LNG
    }, MAP_SCALE);

  L.tileLayer(MAP_LAYER, MAP_ATTRIBUTION).addTo(map);

  const mainPinMarker = L.marker(
    {
      lat: MapCoordinates.LAT,
      lng: MapCoordinates.LNG
    },
    {
      draggable: true,
      icon: mainPinIcon
    }
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  });

  renderMarkers(data);
};

export {loadMap};
