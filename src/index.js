import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

//import './index.css';
//import './layout.css'; 
//import './token.css';
//import './rule.css';

import App from './App';
import WordTokenConfig from './Components/WordTokenConfig'
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render( <App project_name="" field_name=""/>, document.getElementById('root'));

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={App}/>
      {/* add the new route */}
      <Route path=":projectName/:fieldName" component={App}/>
    </Route>
  </Router>
), document.getElementById('root'))


registerServiceWorker();
