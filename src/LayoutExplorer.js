
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
  
  fetch(url,headers).then(response => response.json()).then(data=>setLayouts(data));
       
});



 return (
        
  <table key="layoutExplorerTable">
  
  <thead key="thead">
    <tr key="header">
      <th key="tagType">Tag Type</th>
      <th key="lastUpdated">Last Updated</th>
      <th key="pricing">Pricing</th>

    </tr>
  </thead>
  <tbody key="tbody">
      {layouts.map((layouts) => (
       <tr key={layouts.layout_id}><td className="td-lg"  key={layouts.wdt_tag_type_str} > {layouts.wdt_tag_type_str}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;