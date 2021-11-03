
import React from 'react';
import { useEffect,useState } from 'react';
import { useHistory } from "react-router-dom";





const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);
const history = useHistory();
const [sortConfig, setSortConfig] = React.useState(null);
const url = '/altierre/asg/ws/apt/getTableContents?SelectQueryString=pricing_scenario,wdt_type_id,layout_content,update_date,layout_id from layout';
const username = 'asgadmin';
const password = 'asgAdm1n!';
const headers = new Headers();
headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
headers.set('mode', 'cors');
useEffect(() => {

  fetch(url,headers).then(response => response.json()).then(data=>{
   // extract the tag type from the layout content
   const re = /TagType="([A-Za-z0-9 _]*)"/;
   for (let k=0;k<data.length;k++)  {
    let matchesInside = re.exec(data[k][2]);
 
    data[k]["tagType"]=matchesInside[1];
   }
    setLayouts(data)
  });
 
       
});


const requestSort = (key) => {
  let direction = 'ascending';
  if (
    sortConfig &&
    sortConfig.key === key &&
    sortConfig.direction === 'ascending'
  ) {
    direction = 'descending';
  }

  setSortConfig({ key, direction });
};



if (sortConfig !== null) {

 
  layouts.sort((a, b) => {
 
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
} 

const goToDesignPage = (layout) => {

 // console.log("gather data for "+layout);
  history.push(`/design`);
 console.log(history.location);
};


 return (
        
  <table key="layoutExplorerTable">
  
  <thead key="thead">
    <tr key="header">
      <th key="priceType"><button
              type="button" onClick={() => {requestSort(0)}}>
            Price Type
            </button></th>
      <th key="tagType"><button
              type="button" onClick={() => {requestSort(2)}}>
            Tag Type
            </button></th>  
            <th key="lastUpdated"><button
              type="button" onClick={() => {requestSort(3)}}>
            Last Updated
            </button></th>  

    </tr>
  </thead>
  <tbody key="tbody">
  
      {layouts.map((layout,index) => (
     
      
       <tr key={index} onDoubleClick={() => {goToDesignPage(layout[2])}} ><td className="td-lg"  key={layout[0]} >{layout[0]}</td><td className="td-lg"  key={layout[2]} >{layout["tagType"]}</td><td className="td-lg"  key={layout[3]+index} >{layout[3]}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;