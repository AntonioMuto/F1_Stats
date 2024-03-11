export interface Line {
    Position: string;
    ShowPosition: boolean;
    RacingNumber: string;
    Tla: string;
    BroadcastName: string;
    FullName: string;
    Team: string;
    TeamColour: string;
    LapTime: string | undefined;
    LapState: string;
    DiffToAhead: string;
    DiffToLeader: string;
    OverallFastest: boolean;
    PersonalFastest: boolean;
}