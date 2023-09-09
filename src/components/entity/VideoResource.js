import React, { useRef, useState, useEffect } from "react";
import { StoreContext } from "../../store";
import { formatTimeToMinSec } from "../../utils";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";

export const VideoResource = observer(({ video, index }) => {
  const store = React.useContext(StoreContext);
  const ref = useRef(null);
  const [formattedVideoLength, setFormattedVideoLength] = useState("00:00");

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("loadeddata", handleLoadedData);
      return () => {
        ref.current?.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, []);

  const handleLoadedData = () => {
    const videoLength = ref.current?.duration ?? 0;
    setFormattedVideoLength(formatTimeToMinSec(videoLength));
  };

  return (
    <div className="rounded-lg  items-center bg-slate-800 m-[15px] flex flex-col relative">
      <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
        {formattedVideoLength}
      </div>
      <button
        className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
        onClick={() => store.addVideo(index)}
      >
        <MdAdd size="25" />
      </button>
      <video
        ref={ref}
        className="max-h-[100px] max-w-[150px]"
        src={video}
        height={200}
        width={200}
        id={`video-${index}`}
      ></video>
    </div>
  );
});
