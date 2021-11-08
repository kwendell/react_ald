import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import Mnemonics from './Mnemonics';

const Design =  (props) =>{
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [layout,setLayout] = useState([]);
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
 
  const url = `/altierre/asg/ws/apt/getTagDimension?tagTypeStr=`+history.location.tagType.tagType;
  const username = 'asgadmin';
  const password = 'asgAdm1n!';
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  headers.set('mode', 'cors');

  fetch(url,headers).then(response => response.json()).then(data=>{
    // extract the tag type from the layout content
    setWidth(data[0]);
    setHeight(data[1]);  
   });


   /*
    *http://localhost:8080/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=555736136694090254
    */
   const layoutUrl = `/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=`+history.location.layout_identifier.layout_identifier;

  
 
   fetch(layoutUrl,headers).then(response => response.json()).then(data=>{
   // console.log(data);
      
   });
  
  
  
   var canvasStyle = {
    border: '6px solid white', 
    borderRadius:8,
  };
    
    return (<div style={designStyle}><Mnemonics/><div><canvas style={canvasStyle} width={width} height={height}></canvas ></div></div>);
}
  


export default Design;