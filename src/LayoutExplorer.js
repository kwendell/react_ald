
import React from 'react';
import { useEffect,useState } from 'react';




const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);



useEffect(() => {


  let url = '/altierre/asg/ws/apt/getTableContents?SelectQueryString=pricing_scenario,wdt_type_id,layout_content from layout';
  let username = 'asgadmin';
  let password = 'asgAdm1n!';
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  //mode: 'cors', // no-cors, *cors, same-origin
  headers.set('mode', 'cors');
 
  fetch(url,headers).then(response => response.json()).then(data=>{
   // console.log(data.length);
   const re = /TagType="([A-Za-z0-9 _]*)"/;
   for (let k=0;k<data.length;k++)  {
    let matchesInside = re.exec(data[k][2]);
    data[k][2]=matchesInside[1];
   }
    setLayouts(data)
  });
  //console.log(layouts[0][2]);

  
  //
  for (let i=0;i<layouts.length;i++)  {
  // let matches = re.exec(layouts[i][2]);
 //  console.log(matches.length);
  // if (matches.length>0) {
   // console.log(matches[0]);
  // }
  }
       
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
  
      {layouts.map((layout,index) => (
     
      
       <tr key={index}><td className="td-lg"  key={layout[0]} >{layout[0]}</td><td className="td-lg"  key={layout[2]} >{layout[2]}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;