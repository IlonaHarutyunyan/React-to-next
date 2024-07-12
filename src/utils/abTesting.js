/* eslint-disable no-cond-assign */

import { getCookie, setCookie } from './cookies';

const EXPERIMENTS = [
  // {
  //     name: 'progressive-discount',
  //     from: 75,
  //     to: 100,
  // },
];

const getCryptoRandom = () => {
  try {
    let cryptoRandoms = [];
    const cryptoRandomSlices = [];

    let cryptoRandom = '';

    while ((cryptoRandom = `.${cryptoRandomSlices.join('')}`).length < 30) {
      cryptoRandoms = (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(5));

      for (let i = 0; i < cryptoRandoms.length; i += 1) {
        const cryptoRandomSlice = cryptoRandoms[i] < 4000000000 ? cryptoRandoms[i].toString().slice(1) : '';

        if (cryptoRandomSlice.length > 0) {
          cryptoRandomSlices[cryptoRandomSlices.length] = cryptoRandomSlice;
        }
      }
    }
    return Number(cryptoRandom);
  } catch (e) {
    return Math.random();
  }
};

let currentExperiment = getCookie('bfExperiment');
let currentExperimentPercent = getCookie('bfExperimentPercent');

function init() {
  if (!currentExperimentPercent) {
    currentExperimentPercent = Math.round(getCryptoRandom() * 100);

    setCookie('bfExperimentPercent', currentExperimentPercent);
  }

  currentExperiment = EXPERIMENTS.reduce((value, experiment) => {
    const { name, from, to } = experiment;

    if (currentExperimentPercent >= from && currentExperimentPercent < to) {
      return name;
    }

    return value;
  }, 'none');

  setCookie('bfExperiment', currentExperiment);
}

function hasExperiment(experimentName) {
  return currentExperiment === experimentName;
}

function getExperiment() {
  return currentExperiment || 'none';
}

function isNewCheckout() {
  const value = getCookie('bfCheckout');
  return value !== undefined && value !== null;
}

export { init, hasExperiment, getExperiment, isNewCheckout };
