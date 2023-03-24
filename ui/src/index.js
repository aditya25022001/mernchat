import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ChatProvider from './context/ChatProvider';
import store from './store'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ChatProvider>
      <App />
    </ChatProvider>
  </Provider>
);
