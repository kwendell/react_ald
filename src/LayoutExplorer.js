
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
    <table>
      {layouts.map((user) => (
       <tr> <td >{user.tagType}</td><td>{user.priceType}</td></tr>
      ))}
    </table>
  );

}



export default LayoutExplorer;