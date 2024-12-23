import { StoreContext } from "index";
import { useContext } from "react";

const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};

export default useStore;
