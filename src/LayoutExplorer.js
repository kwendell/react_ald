
import React from 'react';
import { useEffect,useState } from 'react';




const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);



useEffect(() => {


  let url = '/altierre/asg/ws/apt/getTableContents?SelectQueryString=pricing_scenario,wdt_type_id from layout';
  let username = 'asgadmin';
  let password = 'asgAdm1n!';
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  //mode: 'cors', // no-cors, *cors, same-origin
  headers.set('mode', 'cors');
  
  fetch(url,headers).then(response => response.json()).then(data=>console.log(data));
       
});



 return (
        
  <table key="layoutExplorerTable">
  
  <thead>
    <tr key="header">
      <th key="tagType">Tag Type</th>
      <th key="lastUpdated">Last Updated</th>
      <th key="pricing">Pricing</th>

    </tr>
  </thead>
  <tbody key="tbody">
      {layouts.map((layout) => (
       <tr key={layout.layout_id}><td className="td-lg"  key="{layout.wdt_tag_type_str}" > {layout.wdt_tag_type_str}</td><td key="{layout.update_date}" >{layout.update_date}</td><td className="td-lg" key="{layout.pricing_scenario}" >{layout.pricing_scenario}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;