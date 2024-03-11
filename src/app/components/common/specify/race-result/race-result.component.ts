import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../../Services/resultService';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { TimingResult } from '../../../../models/RaceResult/TimingResult';
import { Line } from '../../../../models/RaceResult/Line';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrl: './race-result.component.scss'
})
export class RaceResult implements OnInit {

  raceResult$: Observable<TimingResult> = new Observable<TimingResult>;

  constructor(private timingResultService: ResultService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const paramValue = params['data'];
      this.raceResult$ = this.timingResultService.getResultRace(paramValue).pipe(
        retry(3),
        catchError((error) => {
          console.error("errore chiamata:", error);
          return throwError('ERRORE');
        }),
        map((data: TimingResult) => {
          const linesArray = Object.entries(data.Lines);

          linesArray.sort((a, b) => {
            const positionA = a[1].Position;
            const positionB = b[1].Position;
            return positionA.localeCompare(positionB, undefined, { numeric: true });
          });
          const sortedLines: Line[] = linesArray.map(([key, value]) => value);
          data.Lines = sortedLines;
          return data;
        })
      )
    });
  }


}
