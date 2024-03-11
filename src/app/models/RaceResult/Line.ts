import { BestLapTime } from "./BestLapTime";
import { IntervalToPositionAhead } from "./IntervalPositionAhead";
import { LastLapTime } from "./LastLapTime";
import { Sector } from "./Sector";
import { Speed } from "./Speed";

export interface Line {
    GapToLeader: string;
    IntervalToPositionAhead: IntervalToPositionAhead;
    Line: number;
    Position: string;
    ShowPosition: boolean;
    RacingNumber: string;
    Retired: boolean;
    InPit: boolean;
    PitOut: boolean;
    Stopped: boolean;
    Status: number;
    NumberOfLaps: number;
    NumberOfPitStops: number;
    Sectors: Sector[];
    Speeds: Speed[];
    BestLapTime: BestLapTime;
    LastLapTime: LastLapTime;
}