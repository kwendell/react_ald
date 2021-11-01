import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './Ald.css';




import LayoutExplorer from './LayoutExplorer';









class App extends React.Component {
  render() {


    return   <Router><div><LayoutExplorer /></div></Router>;
	
   
  
}
}
export default App;
