import { Injectable } from '@angular/core';
import { TimingRaceResult } from '../models/RaceResult/TimingRaceResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../assets/config';
import { TimingPracticeResult } from '../models/PracticeResult/TimingPracticesResult';
import { TimingQualifyingResult } from '../models/QualifyingResult/TimingQualifyingResult';

@Injectable({
  providedIn: 'root',
})
export class ResultService {

    constructor(private http: HttpClient) { }


    getResultRace(path: string): Observable<TimingRaceResult> {
      const url = `${ApiConfig.BASE_URL_API}${path}TimingDataF1.json`;
      return this.http.get<TimingRaceResult>(url);
    }

    getResultPractice(path: string): Observable<TimingPracticeResult> {
      const url = `${ApiConfig.BASE_URL_API}${path}TimingDataF1.json`;
      return this.http.get<TimingPracticeResult>(url);
    }

    getResultQualifying(path: string): Observable<TimingQualifyingResult> {
      const url = `${ApiConfig.BASE_URL_API}${path}TimingDataF1.json`;
      return this.http.get<TimingQualifyingResult>(url);
    }

}