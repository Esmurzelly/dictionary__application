import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store.ts';

import './i18n.ts';

import Loader from './components/Loader.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </Router>
  </React.StrictMode>,
)
