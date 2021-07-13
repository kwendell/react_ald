
import React from 'react';
import { useEffect,useState } from 'react';
import { Table } from 'reactstrap';



const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);



useEffect(() => {
  fetch('http://localhost:8000/layouts')
      .then(response => response.json()) 
      .then(data => {
           
            setLayouts(data)}
      );
});



 return (
        
    <Table striped>
  
  <thead>
    <tr key="header">
      <th>Tag Type</th>
      <th>Last Updated</th>
      <th>Pricing</th>
      
    
    </tr>
  </thead>
  <tbody>
      {layouts.map((layout) => (
       <tr key={layout.layout_id}><td className="td-lg" > {layout.wdt_tag_type_str}</td><td className="td-lg" >{layout.update_date}</td><td className="td-lg" >{layout.pricing_scenario}</td></tr>
      ))}
  </tbody>
  </Table>
  );

}



export default LayoutExplorer;