import { useContext } from "react";
import { KontrahenciContext } from "../context/KontrahenciContext";

export const useKontrahenci = () => useContext(KontrahenciContext);
