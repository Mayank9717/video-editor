"use client";

import { fabric } from "fabric";
import React, { useEffect } from "react";
import { StoreContext } from "../store";
import { observer } from "mobx-react";
import "../utils/fabric-utils";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    // Initialize your fabric.js canvas here
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 800,
      backgroundColor: "#ededed",
    });

    // Customize fabric.js canvas settings if needed
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;

    // Handle canvas mouse down without target to deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    // Set the canvas in your store
    store.setCanvas(canvas);

    // Render the canvas
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);

  return (
    <div className="md:grid block grid-rows-[45px_500px_1fr] grid-cols-[90px_200px_800px_1fr] h-[100%]">
      {/* Add your JSX components here */}
      <div className="col-span-4 flex justify-center items-center font-bold mb bg-fuchsia-100 text-fuchsia-600 px-2 text-lg">
        Created By Quickreel
      </div>
      <div className="tile row-span-4 p-4 flex flex-col  border-r-2 border-blue-500">
        <Menu />
      </div>
      <div className="row-span-2 flex flex-col overflow-auto">
        <Resources />
      </div>
      <canvas id="canvas" className="h-[500px] w-[800px] row col-start-3" />
      <div className="col-start-4 row-start-2">
        <ElementsPanel />
      </div>
      <div className="col-start-3 row-start-3 col-span-2 relative overflow-scroll px-[10px] py-[4px]">
        <TimeLine />
      </div>
    </div>
  );
});
