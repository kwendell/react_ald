import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import ReactDOM from "react-dom";
//import { fabric } from "fabric";
import "./Ald.css";

import { fabric } from "fabric";

import Mnemonics from "./Mnemonics";

const useSingleton = (initializer) => {
  React.useState(initializer);
};
const Design = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [layout, setLayout] = useState([]);
  const [canvas, setCanvas] = useState(React.createRef());

  const history = useHistory();
  const canvasRef = useRef(null);

  /*
   *  Obtain JSON layout from layout identifier
   *http://localhost:8080/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=555736136694090254
   */
  const layoutUrl =
    `/altierre/asg/ws/apt/getLayoutInfo?layoutIdentifierStr=` +
    history.location.layout_identifier.layout_identifier;

  const url =
    `/altierre/asg/ws/apt/getTagDimension?tagTypeStr=` +
    history.location.tagType.tagType;
  const username = "asgadmin";
  const password = "asgAdm1n!";
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  headers.set("mode", "cors");

  useSingleton(() => {
    // obtain the height and width of the screen.
    const requestDimensionAwait = async (id = 100) => {
      const response = await fetch(url, headers);
      const json = await response.json();

      setWidth(json[0]);
      setHeight(json[1]);
      // get the instance of the fabric canvas
      let canv = new fabric.Canvas("screen", {
        height: json[1],
        width: json[0],
      });

      var dummy = new fabric.Rect({
        left: 0,
        top: 0,
        //fill: "#F9F9F9",
        fill: "red",
        width: 20,
        height: 20,
        opacity: 1.0,
        // stroke : 'blue',
        // strokeWidth : 1
      });

      canv.add(dummy);

      setCanvas(canv);
      // begin

      console.log("1st fetch");
      // end
    };

    requestDimensionAwait();

    // obtain and set the layout data
    const requestLayoutAwait = async (id = 101) => {
      const response = await fetch(layoutUrl, headers);
      const json = await response.json();
      setLayout(json);
      console.log("2nd fetch");
      //  console.log(json.screens[0].fields[0].name);
      //console.log(data.screens[0].fields[0].x);
      //console.log(data.screens[0].fields[0].y);
      //console.log(data.screens[0].fields[0].width);
      //console.log(data.screens[0].fields[0].height);
    };

    requestLayoutAwait();
  });
  if (layout.id && width > 0 && height > 0 && canvas) {
    console.log(layout.screens[0].fields[0].name);

    console.log(width);
    console.log(height);
    console.log("canvas: " + canvas.width);
  }

  var canvasStyle = {
    border: "4px solid white",
    borderRadius: 4,
  };

  var designStyle = {
    display: "inline-block",
    padding: 20,
    backgroundColor: "#f1f1f1",
    position: "relative",
    float: "left",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={designStyle}>
      <Mnemonics />
      <div id="canvas-wrapper">
        <canvas
          id="screen"
          style={canvasStyle}
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
      </div>
    </div>
  );
};

export default Design;
