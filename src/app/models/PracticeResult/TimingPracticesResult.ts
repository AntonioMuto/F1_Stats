import { Line } from "../RaceResult/Line";
import { LinePractices } from "./LinePractices";

export interface TimingPracticeResult {
    Lines: Line[];
    Withheld: boolean;
}