
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
        
    <Table>
  
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
  </Table>
  );

}



export default LayoutExplorer;