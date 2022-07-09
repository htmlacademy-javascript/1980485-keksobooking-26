import {activateForm} from './form.js';
import {generateAds} from './data.js';
import {renderPopup} from './render-popup.js';

const mapCoordinates = {
  lat: 35.68949,
  lng: 139.69171
};

const mapScale = 10;
const mainPinSize = 52;
const pinSize = 40;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [mainPinSize, mainPinSize],
  iconAnchor: [mainPinSize / 2, mainPinSize],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [pinSize, pinSize],
  iconAnchor: [pinSize / 2, pinSize],
});

const offers = generateAds();

const map = L.map('map-canvas');
const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const onMapLoad = () => {
  activateForm();
};

const createMarkers = (ads) => {
  ads.forEach((ad, index) => {
    const {location} = ad;

    const marker = L.marker({
      lat: location.lat,
      lng: location.lng
    },
    {
      icon: pinIcon
    });

    marker
      .addTo(map)
      .bindPopup(renderPopup(offers[index]));
  });
};

const loadMap = () => {
  map
    .on('load', onMapLoad)
    .setView(mapCoordinates, mapScale);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinMarker = L.marker(
    mapCoordinates,
    {
      draggable: true,
      icon: mainPinIcon
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    address.value = evt.target.getLatLng();
  });

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng(mapCoordinates);
    map.setView(mapCoordinates, mapScale);
  });

  createMarkers(offers);
};

export {loadMap};
