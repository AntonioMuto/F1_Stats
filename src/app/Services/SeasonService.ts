
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { SeasonInfo } from '../models/SeasonServices/SeasonInfo';
import { ApiConfig } from '../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient) { }

  getDati(year: string): Observable<SeasonInfo> {
    const url = `${ApiConfig.BASE_URL_API}${year}/Index.json`;
    return this.http.get<SeasonInfo>(url);
  }
}