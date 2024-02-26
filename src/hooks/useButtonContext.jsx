import { useContext } from "react";
import ButtonContext from "../context/ButtonProvider";

const useButtonContext = () => {
    return useContext(ButtonContext);
}

export default useButtonContext;