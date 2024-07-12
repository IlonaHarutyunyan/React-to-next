/* eslint-disable camelcase */

import axios from 'axios';

import { currentLang } from '../i18n';

const userToken = localStorage.getItem('bfUserToken') ? localStorage.getItem('bfUserToken') : 'anonymous';

const params = new URL(document.location).searchParams;

const utm_mailing = params.get('utm_mailing');
const utm_source = params.get('utm_source');
const utm_medium = params.get('utm_medium');
const utm_campaign = params.get('utm_campaign');
const utm_term = params.get('utm_term');
const utm_content = params.get('utm_content');
const utm_landing = params.get('utm_landing');

let apiHostname = '/api/1.0';

if (process.env.MODE === 'development') {
    apiHostname = 'https://test.beautyfabrics.com/api/1.0';
}

const client = axios.create({
  baseURL: apiHostname,
  params: {
    lang: currentLang,
    utm_mailing,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    utm_landing,
  },
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export default client;
