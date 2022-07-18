import {getData} from './api.js';

const ADS_COUNT = 10;

const housingType = document.querySelector('#housing-type');

let ads = [];

const pushAds = (data) => {
  ads = data;
};

getData(pushAds);

const fiterByType = (ad, type) => type === 'any' || ad.offer.type === type;

const filterAds = () => {
  const selectedType = housingType.value;

  const filteredAds = [];

  for (const ad of ads) {
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }

    if (fiterByType(ad, selectedType)) {
      filteredAds.push(ad);
    }
  }

  return filteredAds;
};

export {filterAds, ADS_COUNT};
