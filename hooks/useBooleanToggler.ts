import {useState} from "react";

export const useBooleanToggler = () => {
  const [booleanState, setBooleanState] = useState<boolean>(false)

  const enable = () => setBooleanState(true);
  const disable = () => setBooleanState(false);

  return {
    booleanState,
    enable,
    disable,
  }
}