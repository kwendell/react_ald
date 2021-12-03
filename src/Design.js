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
  const [canvas, setCanvas] = useState(React.createRef());
  const [initialized, setInitialized] = useState(false);

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
    };

    requestDimensionAwait();

    // obtain and set the layout data
    const requestLayoutAwait = async (id = 101) => {
      const response = await fetch(layoutUrl, headers);
      const json = await response.json();
      setLayout(json);
    };

    requestLayoutAwait();
  });
  if (layout.id && width > 0 && height > 0 && canvas && !initialized) {
    const canv = new fabric.Canvas("screen", {
      height: height,
      width: width,
    });
    for (
      let fieldIndex = 0;
      fieldIndex < layout.screens[0].fields.length;
      fieldIndex++
    ) {
      console.log(layout.screens[0].fields[fieldIndex].name);
      var dummy = new fabric.Rect({
        left: layout.screens[0].fields[fieldIndex].x,
        top: layout.screens[0].fields[fieldIndex].y,
        fill: "#f1f1f1",

        width: layout.screens[0].fields[fieldIndex].width,
        height: layout.screens[0].fields[fieldIndex].height,
        opacity: 1.0,

        stroke: "white",
        strokeWidth: 2,
        selectable: true,
      });

      canv.add(dummy);
    }

    setInitialized(true);
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
