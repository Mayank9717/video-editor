import { makeAutoObservable } from "mobx";
import { fabric } from "fabric";
import { getUid, isHtmlVideoElement } from "../utils";
// import anime from "animejs/lib/anime.es.js"; // Use the ES module version

export class Store {
  constructor() {
    this.canvas = null;
    this.videos = [];
    this.editorElements = [];
    this.backgroundColor = "#111111";
    this.maxTime = 15 * 1000;
    this.playing = false;
    this.currentKeyFrame = 0;
    this.selectedElement = null;
    this.fps = 60;
    // this.animationTimeLine = anime.timeline();
    this.selectedMenuOption = "Video";
    makeAutoObservable(this);
  }

  get currentTimeInMs() {
    return (this.currentKeyFrame * 1000) / this.fps;
  }

  setCurrentTimeInMs(time) {
    this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
  }

  setSelectedMenuOption(selectedMenuOption) {
    this.selectedMenuOption = selectedMenuOption;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    if (canvas) {
      canvas.backgroundColor = this.backgroundColor;
    }
  }

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    if (this.canvas) {
      this.canvas.backgroundColor = backgroundColor;
    }
  }

  updateEffect(id, effect) {
    const index = this.editorElements.findIndex((element) => element.id === id);
    const element = this.editorElements[index];
    this.refreshElements();
  }

  setVideos(videos) {
    this.videos = videos;
  }

  addVideoResource(video) {
    this.videos = [...this.videos, video];
  }

  setSelectedElement(selectedElement) {
    this.selectedElement = selectedElement;
    if (this.canvas) {
      if (selectedElement?.fabricObject)
        this.canvas.setActiveObject(selectedElement.fabricObject);
      else this.canvas.discardActiveObject();
    }
  }

  updateSelectedElement() {
    this.selectedElement =
      this.editorElements.find(
        (element) => element.id === this.selectedElement?.id
      ) ?? null;
  }

  setEditorElements(editorElements) {
    this.editorElements = editorElements;
    this.updateSelectedElement();
    this.refreshElements();
  }

  updateEditorElement(editorElement) {
    this.setEditorElements(
      this.editorElements.map((element) =>
        element.id === editorElement.id ? editorElement : element
      )
    );
  }

  updateEditorElementTimeFrame(editorElement, timeFrame) {
    if (timeFrame.start != undefined && timeFrame.start < 0) {
      timeFrame.start = 0;
    }
    if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
      timeFrame.end = this.maxTime;
    }
    const newEditorElement = {
      ...editorElement,
      timeFrame: {
        ...editorElement.timeFrame,
        ...timeFrame,
      },
    };
    this.updateVideoElements();
    this.updateEditorElement(newEditorElement);
  }

  addEditorElement(editorElement) {
    this.setEditorElements([...this.editorElements, editorElement]);
    this.refreshElements();
    this.setSelectedElement(
      this.editorElements[this.editorElements.length - 1]
    );
  }

  removeEditorElement(id) {
    this.setEditorElements(
      this.editorElements.filter((editorElement) => editorElement.id !== id)
    );
    this.refreshElements();
  }

  setMaxTime(maxTime) {
    this.maxTime = maxTime;
  }

  setPlaying(playing) {
    this.playing = playing;
    this.updateVideoElements();
    if (playing) {
      this.startedTime = Date.now();
      this.startedTimePlay = this.currentTimeInMs;
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }

  startedTime = 0;
  startedTimePlay = 0;

  playFrames() {
    if (!this.playing) {
      return;
    }
    const elapsedTime = Date.now() - this.startedTime;
    const newTime = this.startedTimePlay + elapsedTime;
    this.updateTimeTo(newTime);
    if (newTime > this.maxTime) {
      this.currentKeyFrame = 0;
      this.setPlaying(false);
    } else {
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }

  updateTimeTo(newTime) {
    this.setCurrentTimeInMs(newTime);
    // this.animationTimeLine.seek(newTime);
    if (this.canvas) {
      this.canvas.backgroundColor = this.backgroundColor;
    }
    this.editorElements.forEach((e) => {
      if (!e.fabricObject) return;
      const isInside =
        e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
      e.fabricObject.visible = isInside;
    });
  }

  handleSeek(seek) {
    if (this.playing) {
      this.setPlaying(false);
    }
    this.updateTimeTo(seek);
    this.updateVideoElements();
  }

  addVideo(index) {
    const videoElement = document.getElementById(`video-${index}`);
    if (!isHtmlVideoElement(videoElement)) {
      return;
    }
    const videoDurationMs = videoElement.duration * 1000;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const id = getUid();
    this.addEditorElement({
      id,
      name: `Media(video) ${index + 1}`,
      type: "video",
      placement: {
        x: 0,
        y: 0,
        width: 100 * aspectRatio,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: videoDurationMs,
      },
      properties: {
        elementId: `video-${id}`,
        src: videoElement.src,
        effect: {
          type: "none",
        },
      },
    });
  }

  updateVideoElements() {
    this.editorElements
      .filter((element) => element.type === "video")
      .forEach((element) => {
        const video = document.getElementById(element.properties.elementId);
        if (isHtmlVideoElement(video)) {
          const videoTime =
            (this.currentTimeInMs - element.timeFrame.start) / 1000;
          video.currentTime = videoTime;
          if (this.playing) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
  }

  refreshElements() {
    const store = this;
    if (!store.canvas) return;
    const canvas = store.canvas;
    store.canvas.remove(...store.canvas.getObjects());
    for (let index = 0; index < store.editorElements.length; index++) {
      const element = store.editorElements[index];
      switch (element.type) {
        case "video": {
          console.log("elementid", element.properties.elementId);
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const videoElement = document.getElementById(
            element.properties.elementId
          );
          if (!isHtmlVideoElement(videoElement)) continue;
          const videoObject = new fabric.CoverVideo(videoElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            width: element.placement.width,
            height: element.placement.height,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            customFilter: element.properties.effect.type,
          });

          element.fabricObject = videoObject;
          element.properties.imageObject = videoObject;
          videoElement.width = 100;
          videoElement.height =
            (videoElement.videoHeight * 100) / videoElement.videoWidth;
          canvas.add(videoObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != videoObject) return;
            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width:
                target.width && target.scaleX
                  ? target.width * target.scaleX
                  : placement.width,
              height:
                target.height && target.scaleY
                  ? target.height * target.scaleY
                  : placement.height,
              scaleX: 1,
              scaleY: 1,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
      }
      if (element.fabricObject) {
        element.fabricObject.on("selected", function (e) {
          store.setSelectedElement(element);
        });
      }
    }
    const selectedEditorElement = store.selectedElement;
    if (selectedEditorElement && selectedEditorElement.fabricObject) {
      canvas.setActiveObject(selectedEditorElement.fabricObject);
    }
    this.updateTimeTo(this.currentTimeInMs);
    store.canvas.renderAll();
  }
}

export function isEditorVideoElement(element) {
  return element.type === "video";
}
