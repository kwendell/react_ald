import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from 'react';
import { fabric } from "fabric";


import Mnemonics from './Mnemonics';


const Design =  (props) =>{
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [canvas, setCanvas] = useState('');
  const history = useHistory();
  const width_proportion='70%';
  const float_value = 'left';
  var designStyle = {      
      display: "inline-block",
      padding: 20,
      backgroundColor: "#f1f1f1",    
      position:"relative",
      float:"left"

  };

  useLayoutEffect(() => {
console.log("useLayoutEffect"+width);
  });
/*
  useEffect(() => {
    setCanvas(initCanvas());
  

 
  }, []);

  const initCanvas = () => (
    
    new fabric.Canvas('screen', {height:400,width:400})
 );

 */

 
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
   
   
   
   });

   
  
  
  
   var canvasStyle = {
    border: '6px solid white', 
    borderRadius:8,
    
  };

  
    
    return (<div style={designStyle}><Mnemonics/><canvas id="screen"style={canvasStyle} width={width} height={height}></canvas ></div>);
}
  


export default Design;