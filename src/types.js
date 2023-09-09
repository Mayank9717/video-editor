// EditorElementBase
const EditorElementBase = {
  id: "",
  fabricObject: undefined,
  name: "",
  type: "",
  placement: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    scaleX: 0,
    scaleY: 0,
  },
  timeFrame: {
    start: 0,
    end: 0,
  },
  properties: {},
};

// VideoEditorElement
const VideoEditorElement = {
  ...EditorElementBase,
  type: "video",
  properties: {
    src: "",
    elementId: "",
    imageObject: undefined,
    effect: {},
  },
};

// EditorElement
const EditorElement = [VideoEditorElement];

// Placement
const Placement = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotation: 0,
  scaleX: 0,
  scaleY: 0,
};

// TimeFrame
const TimeFrame = {
  start: 0,
  end: 0,
};

// EffectBase
const EffectBase = {
  type: "",
};

// BlackAndWhiteEffect
const BlackAndWhiteEffect = [
  EffectBase,
  EffectBase,
  EffectBase,
  EffectBase,
  EffectBase,
];

// Effect
const Effect = BlackAndWhiteEffect;
const EffectType = Effect.type;

// SlideDirection
const SlideDirection = ["left", "right", "top", "bottom"];

// SlideTextType
const SlideTextType = ["none", "character"];

// MenuOption
const MenuOption = ["Video"];
