export interface Session {
    Key: number;
    Type: string;
    Number: number;
    Name: string;
    StartDate: string;
    EndDate: string;
    GmtOffset: string;
    Path: string | undefined;
}