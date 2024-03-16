import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiConfig } from "../../assets/config";
import { RaceMessageControl } from "../models/RaceMessageControl/RaceMessage";

@Injectable({
    providedIn: 'root'
  })
  export class RaceMessageService {
  
    constructor(private http: HttpClient) { }
  
    getRaceControlMessages(path: string): Observable<RaceMessageControl> {
      const url = `${ApiConfig.BASE_URL_API}${path}RaceControlMessages.json`;
      return this.http.get<RaceMessageControl>(url);
    }
    
  }