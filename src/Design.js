import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
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
  const [canvas, setCanvas] = useState("");

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
    fetch(url, headers)
      .then((response) => response.json())
      .then((data) => {
        // extract the tag type from the layout content
        setWidth(data[0]);
        setHeight(data[1]);
        // get the instance of the fabric canvas
        const canv = new fabric.Canvas("screen", {
          height: data[1],
          width: data[0],
        });
        setCanvas(canv);
        console.log("complete fetch 1");
      });

    // obtain and set the layout data
    fetch(layoutUrl, headers)
      .then((response) => response.json())
      .then((data) => {
        setLayout(data);
        //console.log(data.screens[0].fields[0].name);
        //console.log(data.screens[0].fields[0].x);
        //console.log(data.screens[0].fields[0].y);
        //console.log(data.screens[0].fields[0].width);
        //console.log(data.screens[0].fields[0].height);
        console.log("complete fetch 2");
      }, []);
  });

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
