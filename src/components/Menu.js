import React from "react";
import { StoreContext } from "../store";
import { observer } from "mobx-react";
import { MdVideoLibrary } from "react-icons/md";
import { Store } from "../store/Store";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);

  const handleOptionClick = (optionName) => {
    switch (optionName) {
      case "Video":
        store.setSelectedMenuOption("Video");
        break;
      // Add more cases for other menu options if needed
      default:
        break;
    }
  };

  return (
    <>
      {MENU_OPTIONS.map((option) => {
        return (
          <button
            key={option.name}
            onClick={() => handleOptionClick(option.name)}
            className="p-2 w-full flex flex-col items-center text-xs border border-blue bg-blue-100 rounded-full"
          >
            <option.icon
              size="20"
              color={
                store.selectedMenuOption === option.name ? "#00a0f5" : "black"
              }
            />
            <div
              className={
                store.selectedMenuOption === option.name
                  ? "font-semibold"
                  : "font-light"
              }
            >
              {option.name}
            </div>
          </button>
        );
      })}
    </>
  );
});

const MENU_OPTIONS = [
  {
    name: "Video",
    icon: MdVideoLibrary,
    action: () => {
      Store.setSelectedMenuOption("Video");
    },
  },
  // Add more menu options here as needed
];
