import { Circuit } from "./Circuit";
import { Country } from "./Country";
import { Session } from "./Session";

export interface  Meeting {
    Sessions: Session[];
    Key: number;
    Code: string;
    Number: number;
    Location: string;
    OfficialName: string;
    Name: string;
    Country: Country;
    Circuit: Circuit;
}