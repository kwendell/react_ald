
import React from 'react';
import { useEffect,useState } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';






const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);
const [data,setData] = useState([]);


useEffect(() => {
  fetch('http://localhost:8000/layouts')
      .then(response => response.json()) 
      .then(data => {
           
            setLayouts(data)}
      );
});



         
     

// return (<div>  
 //  <table><tr><td>{layouts[0].tagType}</td><td>{layouts[0].priceType}</td></tr></table></div>
//);

 return (
        
    <table id="LayoutTable" className="table table-bordered"  width="100%">
   {data.id}
  <thead>
    <tr key="header">
      <th>Price Type</th>
      <th>Tag Type</th>
    
    </tr>
  </thead>
  <tbody>
      {layouts.map((layout) => (
       <tr key={layout.layout_id}><td className="td-lg" > {layout.wdt_type_id}</td><td className="td-lg" >{layout.update_date}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;