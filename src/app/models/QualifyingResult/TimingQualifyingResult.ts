import { Line } from "../RaceResult/Line";
import { LineQualifying } from "./LineQualifying";

export interface TimingQualifyingResult {
    NoEntries: number[];
    SessionPart: number;
    CutOffTime: string;
    CutOffPercentage: string;
    Lines: Line[];
    Withheld: boolean;
}