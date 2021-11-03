import React from 'react';
import { useHistory } from "react-router-dom";



const Design =  (props) =>{
  const history = useHistory();
    const width_proportion='70%';
    const float_value = 'left';
    var designStyle = {      
      display: "inline-block",
      padding: 20,
      backgroundColor: "#f1f1f1",
      
      position:"relative",
      float:float_value,
      width: width_proportion,
    };

  console.log(history.location.layout_identifier);

    
   

    
     var canvasStyle = {
     border: '8px solid white', 
     borderRadius:12,
    
    };

  
    //<canvas ref="c" id = "c"></canvas>
    
    return (<div style={designStyle}><div><canvas   style={canvasStyle} width="500" height="250"></canvas ></div></div>);
}
  


export default Design;