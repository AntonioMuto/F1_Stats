
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ApiConfig } from '../../assets/config';
import { TopThree } from '../models/SeasonServices/TopThree';

@Injectable({
  providedIn: 'root'
})
export class TopThreeService {

  constructor(private http: HttpClient) { }

  getDati(path: string): Observable<TopThree> {
    const url = `${ApiConfig.BASE_URL_API}${path}TopThree.json`;
    return this.http.get<TopThree>(url);
  }
}