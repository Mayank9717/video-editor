import React from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;

  // Modify or add any additional components and elements as needed
  return (
    <>
      <SeekPlayer />
      <div className="relative height-auto">
        <div
          className="w-[2px] bg-red-400 absolute top-0 bottom-0 z-20"
          style={{
            left: `${percentOfCurrentTime}%`,
          }}
        ></div>
        {store.editorElements.map((element) => {
          return <TimeFrameView key={element.id} element={element} />;
        })}
        {/* Add more elements or components here */}
      </div>
    </>
  );
});
