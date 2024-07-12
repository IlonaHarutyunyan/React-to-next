import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { init as initAmplitude } from './metrics';
import { init as initABTesting } from './utils/abTesting';
import generateId from './utils/generateId';

if (!document.cookie.includes('bfDeviceId')) {
  const deviceId = generateId();

  const expirationDate = new Date();

  expirationDate.setFullYear(expirationDate.getFullYear() + 5);

  document.cookie = `bfDeviceId=${deviceId}; expires=${expirationDate.toUTCString()}; path=/`;
}

initABTesting();
initAmplitude();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
