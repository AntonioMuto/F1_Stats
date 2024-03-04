// homepage.component.ts

import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../../Services/SeasonService';
import { Observable, catchError, finalize, map, retry, throwError } from 'rxjs';
import { SeasonInfo } from '../../../../models/SeasonServices/SeasonInfo';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import { TranslateCountryFlag } from '../../../../utility/TranslateCountryFlag';

interface Year {
  value: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  selectedYear: string = '2024';
  seasonInfo$: Observable<SeasonInfo> = new Observable<SeasonInfo>;
  buttonYearCollapsed: boolean = false;

  constructor(private seasonService: SeasonService, private translatorFlag: TranslateCountryFlag) {
    ClarityIcons.addIcons(userIcon);
  }

  ngOnInit(): void {
    this.loadSeasonData();
  }

  years: Year[] = [
    { value: '2018' },
    { value: '2019' },
    { value: '2020' },
    { value: '2021' },
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
  ];

  onSelectChange(event: any): void {
    const selectedYear = event.value;
    this.selectedYear = selectedYear;
    this.loadSeasonData(selectedYear);
  }

  loadSeasonData(year: string = this.selectedYear): void {
    this.seasonInfo$ = this.seasonService.getDati(year).pipe(
      retry(3),
      catchError((error) =>{
        console.error("errore chiamata:", error);
        return throwError('ERRORE');
      }),
      map((data: SeasonInfo) =>{
        console.log(data);
        return data;
      })
      // finalize();
    )
  }

  print(){
    const element = document.getElementById('icon-button-year') as HTMLElement;
    if (element) {
      this.buttonYearCollapsed = !this.buttonYearCollapsed;
      element.setAttribute('direction', this.buttonYearCollapsed ? 'up' : 'down');
    }
  }

  selected(year: string){
    this.selectedYear = year;
    this.print();
    this.loadSeasonData(this.selectedYear);
  }


  translateFlag(flagCode: string){
    return `https://flagsapi.com/${this.translatorFlag.myMap.get(flagCode)}/flat/64.png`;
  }

  changeDateFormat(data: string){
    if(data === undefined){
      return "NA";
    } else{
      const parti = data.split('T');
      const parteData = parti[0];
      return parteData;
    }
  }

}
