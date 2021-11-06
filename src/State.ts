import { atom } from "recoil";
import { IRandomResult } from "./Models";

export const resultsState = atom<IRandomResult[]>({
    key: "resultsState",
    default: [],
});