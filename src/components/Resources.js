"use client";
import React from "react";
import { StoreContext } from "../store";
import { observer } from "mobx-react";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;

  // Create a mapping of menu options to their corresponding panels
  const panelComponents = {
    Video: <VideoResourcesPanel />,
  };

  // Conditionally render the selected panel
  const selectedPanel = panelComponents[selectedMenuOption];

  return <>{selectedPanel}</>;
});
