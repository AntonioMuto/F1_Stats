import { Injectable } from '@angular/core';
import { TimingResult } from '../models/RaceResult/TimingResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../assets/config';

@Injectable({
  providedIn: 'root',
})
export class ResultService {

    constructor(private http: HttpClient) { }


    getResultRace(path: string): Observable<TimingResult> {
      const url = `${ApiConfig.BASE_URL_API}${path}TimingDataF1.json`;
      return this.http.get<TimingResult>(url);
    }

}