
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonInfo } from '../models/SeasonServices/SeasonInfo';
import { ApiConfig } from '../../assets/config';
import { DriverInfo } from '../models/DriverList/DriverInfo';
import { DriversData } from '../models/DriverList/DriversData';

@Injectable({
  providedIn: 'root'
})
export class DriverListService {

  constructor(private http: HttpClient) { }


  getDriverList(path: string): Observable<DriversData> {
    const url = `${ApiConfig.BASE_URL_API}${path}DriverList.json`;
    return this.http.get<DriversData>(url);
  }
}