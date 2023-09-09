import React from "react";
export function UploadButton(props) {
  return React.createElement(
    "label",
    { htmlFor: "fileInput", className: props.className },
    React.createElement("input", {
      id: "fileInput",
      type: "file",
      accept: props.accept,
      className: "hidden",
      onChange: props.onChange,
    }),
    "Upload"
  );
}
