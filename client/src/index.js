import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { BrowserRouter as Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router'



ReactDOM.render(<StaticRouter location={req.url}>
<Routes><App /></Routes></StaticRouter>, document.getElementById('root'));
unregister()
