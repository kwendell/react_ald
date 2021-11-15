import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './Ald.css';

import LayoutExplorer from './LayoutExplorer';
import Design from './Design';
import { ReactQueryDevtools } from 'react-query/devtools';



function App()  {



    return(<div> <Router>
      <Switch>
        <Route exact path="/" ><LayoutExplorer/></Route>
        <Route path="/design" ><div><Design component={Design } /></div></Route>
      
      </Switch>
      </Router>
      </div>
               )
	
   
  

}
export default App;
