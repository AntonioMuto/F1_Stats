import { Injectable } from '@angular/core';
import { TimingRaceResult } from '../models/RaceResult/TimingRaceResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../assets/config';
import { Stints } from '../models/TyreStint/Stints';

@Injectable({
  providedIn: 'root',
})
export class TyreStintServices {

    constructor(private http: HttpClient) { }


    getTyreInfo(path: string): Observable<Stints> {
      const url = `${ApiConfig.BASE_URL_API}${path}TyreStintSeries.json`;
      return this.http.get<Stints>(url);
    }

}