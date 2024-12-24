import { useContext } from "react";
import { StoreContext } from "../main";

const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};

export default useStore;
