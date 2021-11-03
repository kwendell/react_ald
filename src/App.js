import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './Ald.css';

import LayoutExplorer from './LayoutExplorer';
import Design from './Design';



class App extends React.Component {
  render() {


    return( <Router>
      <Switch>
        <Route exact path="/" ><LayoutExplorer/></Route>
        <Route path="/design" ><div><Design component={Design} /></div></Route>
      
      </Switch>
      </Router>
               )
	
   
  
}
}
export default App;
