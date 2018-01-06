import React from 'react';

import './mainscreen.css';
import logo from './../assets/logo.svg';

const MainScreen = () => (
  <div className="MainScreen">
    <div className="MainScreen-header">
      <img src={logo} className="MainScreen-logo" alt="logo" />
      <h2>React/Electron</h2>
    </div>
    <p className="MainScreen-intro">
      To get started, edit <code>src/MainScreen.js</code> and save to reload.
    </p>
  </div>
);

export default MainScreen;
