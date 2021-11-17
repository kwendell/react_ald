import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';
import { fabric } from "fabric";
import './Ald.css';

import Mnemonics from './Mnemonics';


const Design =  (props) =>{
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const history = useHistory();


  var designStyle = {      
      display: "inline-block",
      padding: 20,
      backgroundColor: "#f1f1f1",    
      position:"relative",
      float:"left",
      width:"100%",
      height:"100%"

  };

  useLayoutEffect(() => {

   
    if (height>0 && width>0)  {
    const canvas = new fabric.Canvas('screen', {
      height: height,
      width: width,
      stopContextMenu: true,
      backgroundColor: undefined,
      backgroundImage: undefined,
     
});


canvas.requestRenderAll()

  }
  });


 
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
    *  Obtain JSON layout from layout identifier 
    *http://localhost:8080/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=555736136694090254
    */
   const layoutUrl = `/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=`+history.location.layout_identifier.layout_identifier;

   fetch(layoutUrl,headers).then(response => response.json()).then(data=>{
   
    // Here is where we add to the canvas
   
   });

   const height_value = '20%';
   var canvasStyle = {
    border: '6px solid white', 
    borderRadius:8,
    height:height_value
    
  };

  
    
    return (<div style={designStyle}><Mnemonics/><div id="canvas-wrapper"><canvas id="screen" style={canvasStyle} ></canvas ></div></div>);
}
  


export default Design;