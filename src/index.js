import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { UserContextProvider } from './context/UserContext';
import App from './App';
import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyCQQeeX3BzTkVj1q-y7lZ6EhSEysuekWOc",
  authDomain: "hit-project-55efb.firebaseapp.com",
  projectId: "hit-project-55efb",
  storageBucket: "hit-project-55efb.appspot.com",
  messagingSenderId: "1052152504948",
  appId: "1:1052152504948:web:e3ed0bdd21cc1eac8fa721",
  measurementId: "G-M4YRB5WHED"
}

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  //</React.StrictMode>
);

