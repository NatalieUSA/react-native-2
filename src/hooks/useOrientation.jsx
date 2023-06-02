import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useOrientation = () => {
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    });
  }, []);

  return orientation;
};
