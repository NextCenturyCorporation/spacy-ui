import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render( <App project_name="" field_name=""/>, document.getElementById('root'));

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={App}/>
      {/* add the new route */}
      <Route path=":serverName/:projectName/:fieldName" component={App}/>
    </Route>
  </Router>
), document.getElementById('root'))


registerServiceWorker();
