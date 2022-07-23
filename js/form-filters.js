import {debounce} from './util.js';
import {clearMarkers, renderMarkers, renderDefaultMarkers} from './map.js';

const ADS_COUNT = 10;
const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000
};

const mapFiltersElement = document.querySelector('.map__filters');
const filterSelectElements = mapFiltersElement.querySelectorAll('select');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFiltersElement.querySelector('#housing-features');
const filterCheckboxesElements = housingFeaturesElement.querySelectorAll('input');

const filterByType = (ad, type) => type === 'any' || ad.offer.type === type;

const filterByPrice = (ad, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price < PriceValue.MIDDLE;
    case 'middle':
      return (ad.offer.price < PriceValue.HIGH && ad.offer.price >= PriceValue.MIDDLE);
    case 'high':
      return ad.offer.price >= PriceValue.HIGH;
    default:
      return true;
  }
};

const filterByRooms = (ad, rooms) => rooms === 'any' || ad.offer.rooms === +rooms;

const filterByGuests = (ad, guests) => guests === 'any' || ad.offer.guests === +guests;

const filterByFeatures = (ad, features) => {
  const dataFeatures = ad.offer.features;
  if (dataFeatures) {
    return features.every((feature) => dataFeatures.includes(feature.value));
  }
};

const filterAds = (data) => {
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;
  const checkedFeatures = Array.from(housingFeaturesElement.querySelectorAll('input[type="checkbox"]:checked'));

  const filteredAds = [];

  for (const ad of data) {
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }

    if (
      filterByType(ad, selectedType) &&
      filterByPrice(ad, selectedPrice) &&
      filterByRooms(ad, selectedRooms) &&
      filterByGuests(ad, selectedGuests) &&
      filterByFeatures(ad, checkedFeatures)
    ) {
      filteredAds.push(ad);
    }
  }

  return filteredAds;
};

const onFilterChange = (data) =>{
  clearMarkers();
  const filteredMarkers = filterAds(data);
  renderMarkers(filteredMarkers);
};

const setFilterListener = (data) => {
  mapFiltersElement.addEventListener('change', debounce(() => onFilterChange(data)));
};

const resetFilters = () => {
  filterSelectElements.forEach((filterSelect) => {
    filterSelect.value = 'any';
  });

  filterCheckboxesElements.forEach((filterCheckbox) => {
    filterCheckbox.checked = false;
  });

  renderDefaultMarkers();
};

export {filterAds, ADS_COUNT, setFilterListener, resetFilters};
