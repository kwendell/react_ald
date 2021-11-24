import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
//import { fabric } from "fabric";
import "./Ald.css";
import { useQuery } from "react-query";
import { fabric } from "fabric";

import Mnemonics from "./Mnemonics";

const Design = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [layout, setLayout] = useState([]);
  const [canvas, setCanvas] = useState("");

  const history = useHistory();
  const canvasRef = useRef(null);

  const initCanvas = () =>
    new fabric.Canvas("screen", {
      height: height,
      width: width,
      backgroundColor: "pink",
    });

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

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

  useQuery("setDimensionKey", () =>
    fetch(url, headers)
      .then((response) => response.json())
      .then((data) => {
        // extract the tag type from the layout content
        setWidth(data[0]);
        console.log(data[0]);
        setHeight(data[1]);
        console.log(data[1]);
      })
  );
  useQuery("setLayoutKey", () =>
    fetch(layoutUrl, headers)
      .then((response) => response.json())
      .then((data) => {
        console.log("setLayout");
        setLayout(data);
      }, [])
  );

  // const height_value = height;
  // const width_value = width;

  var canvasStyle = {
    border: "4px solid white",
    borderRadius: 4,
    height: height,
    width: width,
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
        <canvas id="screen" style={canvasStyle} ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Design;
