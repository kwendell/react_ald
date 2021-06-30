
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
         
     

 return (<div>{layouts[0].tagType}</div>);

}

export default LayoutExplorer;