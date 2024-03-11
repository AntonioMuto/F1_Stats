import { Segment } from "./Segment";

export interface Sector{
    Stopped: boolean;
    PreviousValue: string;
    Segments: Segment[];
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
}