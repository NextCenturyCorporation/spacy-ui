import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import './layout.css'; 
//import './token.css';
//import './rule.css';

import App from './App';
import WordTokenConfig from './Components/WordTokenConfig'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <App project_name="" field_name=""/>, document.getElementById('root'));
registerServiceWorker();
