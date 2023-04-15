import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';
import { ErrorContextProvider } from './context/ErrorContext';
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <UserContextProvider>
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    </UserContextProvider>
  //</React.StrictMode>
);

