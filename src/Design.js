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
const Design = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [layout, setLayout] = useState([]);

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
  const username = "username";
  const password = "password";
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
  if (layout.id && width > 0 && height > 0 && !initialized) {
    var canv = new fabric.Canvas("screen", {
      height: height,
      width: width,
      isDrawingMode: false,
    });

    //   canv.on("object:rotating", function (options) {
    //    var step = 90;
    //  options.target.angle = Math.round(options.target.angle / step) * step;
    // });

    for (
      let fieldIndex = 0;
      fieldIndex < layout.screens[0].fields.length;
      fieldIndex++
    ) {
      var dummy = new fabric.Rect({
        //left: layout.screens[0].fields[fieldIndex].x,
        //top: layout.screens[0].fields[fieldIndex].y,
        fill: "#f1f1f1",

        width: layout.screens[0].fields[fieldIndex].width,
        height: layout.screens[0].fields[fieldIndex].height,
        opacity: 1.0,

        stroke: "white",
        strokeWidth: 2,
        selectable: true,
      });
      var text = new fabric.Text(layout.screens[0].fields[fieldIndex].name, {
        fontSize: 11,
        fontFamily: "sans-serif",
        // originX: "center",
        // originY: "center",
        lockScalingX: true,
        lockSkewingX: true,
        textAlign: "center",

        //left: 20,
      });

      var group = new fabric.Group([dummy, text], {
        left: layout.screens[0].fields[fieldIndex].x,
        top: layout.screens[0].fields[fieldIndex].y,
        snapAngle: 90,
      });

      canv.add(group);

      canv.on({
        "object:scaling": handleScalingEvent,
      });

      function handleScalingEvent(obj) {
        var text = obj.target.item(1),
          group = obj.target;
        const scaleX = group.width / (group.width * group.scaleX);
        const scaleY = group.height / (group.height * group.scaleY);

        text.set("scaleX", scaleX);
        text.set("scaleY", scaleY);
      }
    }

    setInitialized(true);
  }

  return (
    <div class="design">
      <Mnemonics class="mnemonics" />
      <div id="canvas-wrapper">
        <canvas
          id="screen"
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
      </div>
    </div>
  );
};

export default Design;
