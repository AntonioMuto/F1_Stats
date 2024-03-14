import { BestLapTime } from "../RaceResult/BestLapTime";
import { LastLapTime } from "../RaceResult/LastLapTime";
import { Sector } from "../RaceResult/Sector";
import { Speed } from "../RaceResult/Speed";

export interface LinePractices {
    TimeDiffToFastest: string;
    TimeDiffToPositionAhead: string;
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