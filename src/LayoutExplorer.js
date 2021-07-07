
import React from 'react';
import { useEffect,useState } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';




const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);
const [entry,setEntry] = useState(2);

useEffect(() => {
  fetch('http://localhost:8000/layouts')
      .then(response => response.json()) 
      .then(data => {//console.log(data);
           
            setLayouts(data)}
      );
});
         
     

// return (<div>  
 //  <table><tr><td>{layouts[0].tagType}</td><td>{layouts[0].priceType}</td></tr></table></div>
//);

 return (
    <table id="LayoutTable" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
   
  <thead>
    <tr>
      <th scope="col">Tag Type</th>
      <th scope="col">Price Type</th>
    
    </tr>
  </thead>
  <tbody>
      {layouts.map((layout) => (
       <tr>   <td class="th-sm" >{layout.tagType}</td><td class="th-sm">{layout.priceType}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;