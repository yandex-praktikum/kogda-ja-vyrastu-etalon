import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import store from './store/store';

import { AlegreyaSansFonts, AlegreyaFonts } from './vendor/fonts';
import GlobalStyles from './ui-lib';

import App from './app/app';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <AlegreyaSansFonts />
        <AlegreyaFonts />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

);
