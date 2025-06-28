
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './context/AppContext'; // ✅ Make sure you import correctly
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider> {/* ✅ Wrap App in context provider */}
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
