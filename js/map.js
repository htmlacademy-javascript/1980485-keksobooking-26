import {getData} from './api.js';
import {activateForm, activateFilters} from './form.js';
import {renderPopup} from './render-popup.js';
import {setFilterListener, ADS_COUNT} from './form-filters.js';

const MapCoordinates = {
  LAT: 35.68949,
  LNG: 139.69171
};

const MAP_SCALE = 12;
const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;
const MAP_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const ADDRESS_DEFAULT = `${MapCoordinates.LAT}, ${MapCoordinates.LNG}`;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

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

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const map = L.map('map-canvas');

const addressElement = document.querySelector('#address');

let renderDefaultMarkers;

const layerGroup = L.layerGroup().addTo(map);

const clearMarkers = () => {
  layerGroup.clearLayers();
};

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

const resetMap = () => {
  mainPinMarker.setLatLng({lat: MapCoordinates.LAT, lng: MapCoordinates.LNG});
  map.setView({lat: MapCoordinates.LAT, lng: MapCoordinates.LNG}, MAP_SCALE);
  map.closePopup();
  setTimeout(() => {
    addressElement.value = ADDRESS_DEFAULT;
  }, 0);
};

const onLoadDataSuccess = (data) => {
  renderMarkers(data.slice(0, ADS_COUNT));
  activateFilters();
  setFilterListener(data);

  renderDefaultMarkers = () => {
    renderMarkers(data.slice(0, ADS_COUNT));
  };
};

const onMapLoad = () => {
  activateForm();
  addressElement.value = ADDRESS_DEFAULT;
  getData(onLoadDataSuccess);
};

const loadMap = () => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: MapCoordinates.LAT,
      lng: MapCoordinates.LNG
    }, MAP_SCALE);

  L.tileLayer(MAP_LAYER, MAP_ATTRIBUTION).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  });
};

export {loadMap, ADDRESS_DEFAULT, resetMap, renderMarkers, clearMarkers, renderDefaultMarkers};
