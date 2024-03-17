import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfig } from "../../assets/config";
import { RaceMessageControl } from "../models/RaceMessageControl/RaceMessage";
import { Capture } from "../models/TeamsRadio/Capture";

@Injectable({
    providedIn: 'root'
  })
  export class TeamRadioService {
  
    constructor(private http: HttpClient) { }
  
    getTeamsRadio(path: string | null): Observable<Capture> {
      const url = `${ApiConfig.BASE_URL_API}${path}TeamRadio.json`;
      return this.http.get<Capture>(url);
    }
    
  }