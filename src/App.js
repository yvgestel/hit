import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';

import { PrivateRoute } from './components/atoms/privateRoute/privateRoute';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Game } from './pages/game/game';
import { TestGame } from './games/testgame';
import { Component } from './test/test';

function App() {
  return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route 
              path='/startgame'
              element={<TestGame />}
            />
            <Route 
              path='/test'
              element={<Component />}
            />
            <Route
              path="/game"
              element={
                <PrivateRoute>
                  <Game />
                </PrivateRoute>
              }
            />
            <Route 
              path='/login'
              element={<Login />}
            />
            <Route 
              path='/free'
              element={<Game />}
            />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
