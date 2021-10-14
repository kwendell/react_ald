
import React from 'react';
import { useEffect,useState } from 'react';
import { Table } from 'reactstrap';



const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);



useEffect(() => {


  let url = 'https://shrouded-reef-81745.herokuapp.com/http://localhost:8080/altierre/asg/ws/apt/getTableContents?SelectQueryString=pricing_scenario,wdt_type_id%20from%20layout';
  let username = 'asgadmin';
  let password = 'asgAdm1n!';
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  
  fetch("www.amazon.com",headers).then(response => response.json()).then(data=>setLayouts(data));
       
});



 return (
        
  <table>
  
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
  </table>
  );

}



export default LayoutExplorer;