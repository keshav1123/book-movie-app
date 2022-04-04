import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import { Provider } from 'react-redux';
import movieStore from './movieStore';

ReactDOM.render(<Provider store={movieStore}><Controller /></Provider>, document.getElementById('root'));
registerServiceWorker();
