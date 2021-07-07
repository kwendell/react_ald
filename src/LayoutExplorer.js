
import React from 'react';
import { useEffect,useState } from 'react';





const LayoutExplorer  = () => {

const [layouts, setLayouts] = useState([]);


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
    <table id="LayoutTable" className="table table-striped table-bordered table-sm"  width="100%">
   
  <thead>
    <tr key="header">
      <th scope="col">Tag Type</th>
      <th scope="col">Price Type</th>
    
    </tr>
  </thead>
  <tbody>
      {layouts.map((layout) => (
       <tr key={layout.layout_id}><td className="th-sm" > {layout.tagType}</td><td className="th-sm" >{layout.priceType}</td></tr>
      ))}
  </tbody>
  </table>
  );

}



export default LayoutExplorer;