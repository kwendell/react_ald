
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
  
  fetch(url,headers).then(response => response.json()).then(data=>{setLayouts(data)});
       
});



 return (
        
  <table key="layoutExplorerTable">
  
  <thead key="thead">
    <tr key="header">
      <th key="tagType">Price Type</th>
      <th key="lastUpdated">Tag Type</th>  

    </tr>
  </thead>
  <tbody key="tbody">
      {layouts.map((layout) => (
       <tr key={layout[1]}><td className="td-lg"  key={layout.pricing_scenario} >{layout[0]}</td><td className="td-lg"  key={layout.id} >{layout[1]}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;