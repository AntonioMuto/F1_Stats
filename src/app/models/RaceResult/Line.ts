import { BestLapTime } from "./BestLapTime";
import { IntervalToPositionAhead } from "./IntervalPositionAhead";
import { LastLapTime } from "./LastLapTime";
import { Sector } from "./Sector";
import { Speed } from "./Speed";

export interface Line {
    Stats: {
        TimeDiffToFastest: string;
        TimeDifftoPositionAhead: string;
    };
    KnockedOut: boolean;
    Cutoff: boolean;
    BestLapTimes: {
        Value: string;
        Lap: number;
    }[];
    TimeDiffToFastest: string;
    TimeDiffToPositionAhead: string;
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