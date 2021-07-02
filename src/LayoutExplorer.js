
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
    <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <tr><th class="th-sm">Tag Type</th><th class="th-sm">Price Type</th></tr>
      {layouts.map((layout) => (
       <tr> <td >{layout.tagType}</td><td>{layout.priceType}</td></tr>
      ))}
    </table>
  );

}



export default LayoutExplorer;