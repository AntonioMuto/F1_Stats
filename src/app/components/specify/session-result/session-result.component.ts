import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, retry, switchMap, tap, throwError } from 'rxjs';
import { DriverListService } from '../../../Services/DriverListService';
import { TyreStintServices } from '../../../Services/TyreStintSeriesService';
import { ResultService } from '../../../Services/resultService';
import { DriverInfo } from '../../../models/DriverList/DriverInfo';
import { DriversData } from '../../../models/DriverList/DriversData';
import { TypeResult } from '../../../models/Enum/TypeResult.enum';
import { TimingPracticeResult } from '../../../models/PracticeResult/TimingPracticesResult';
import { Line } from '../../../models/RaceResult/Line';
import { TimingRaceResult } from '../../../models/RaceResult/TimingRaceResult';
import { Stints } from '../../../models/TyreStint/Stints';
import { TimingQualifyingResult } from '../../../models/QualifyingResult/TimingQualifyingResult';
import { LineQualifying } from '../../../models/QualifyingResult/LineQualifying';
import { LinePractices } from '../../../models/PracticeResult/LinePractices';
import { RaceMessageControl } from '../../../models/RaceMessageControl/RaceMessage';
import { RaceMessageService } from '../../../Services/RaceMessageService';

@Component({
  selector: 'app-session-result',
  templateUrl: './session-result.component.html',
  styleUrl: './session-result.component.scss'
})
export class SessionResultComponent implements OnInit {

  raceResult$: Observable<TimingRaceResult | TimingPracticeResult | TimingQualifyingResult> = new Observable<TimingRaceResult | TimingPracticeResult | TimingQualifyingResult>;
  driverList$: Observable<DriversData> = new Observable<DriversData>;
  tyreStints$: Observable<Stints> = new Observable<Stints>;
  raceMessage$: Observable<RaceMessageControl> = new Observable<RaceMessageControl>;
  driversMap: { [key: string]: DriverInfo } = {};
  isRowExpanded: boolean[] = [];
  resultType: TypeResult = TypeResult.RACE;
  pathApi: string | null | undefined;

  constructor(
    private timingRaceResultService: ResultService,
    private driverService: DriverListService,
    private route: ActivatedRoute,
    private tyreService: TyreStintServices,
    private raceMessageService: RaceMessageService
  ) {
  }

  toggleRow(index: number) {
    this.isRowExpanded[index] = !this.isRowExpanded[index];
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const paramValue = params['data'];
        this.pathApi = paramValue;

        return this.driverService.getDriverList(paramValue).pipe(
          retry(3),
          catchError((error) => {
            console.error("errore chiamata:", error);
            return throwError('ERRORE');
          }),
          tap((data: DriversData) => {
            console.log("DRIVER", data);
            for (const driverNumber in data) {
              if (data.hasOwnProperty(driverNumber)) {
                const driver: DriverInfo = data[parseInt(driverNumber, 10)];
                this.driversMap[driver.RacingNumber] = driver;
              }
            }
          }),
          switchMap(() => {
            return this.retrieveResultSession(paramValue);
          }),
          switchMap(() => {
            return this.tyreService.getTyreInfo(paramValue).pipe(
              retry(3),
              catchError((error) => {
                console.error("errore chiamata:", error);
                return throwError('ERRORE');
              }),
              tap((data: Stints) => {
                console.log("STINTS", data);
                const entries = Object.entries(data.Stints);
                entries.forEach(([key, value]) => {
                  this.driversMap[key].tyre = value[value.length - 1].Compound;
                });
                this.tyreStints$ = of(data);
              })
            );
          }),
        );
      })
    ).subscribe();
  }


  retrieveColorPosition(position: string, retired: boolean, stopped: boolean) {
    switch (position) {
      case "1":
        return "#b5a642";
      case "2":
        return "#CECCCC";
      case "3":
        return "#D67C21";
      default:
        if (stopped) {
          return "#D40A0AF3";
        }
        if (retired) {
          return "#EB3C1D";
        }
        return "#F5F3F3";
    }
  }

  retrievePosition(stopped: boolean, position: string) {
    return stopped ? "DNF" : position;
  }

  retrieveGapToLeader(stopped: boolean, gap: string) {
    if (stopped) {
      return "-";
    }
    if (gap != "" && gap.search('L')) {
      var newGap = gap.replaceAll('L', " LAPS")
      return newGap;
    }
    return gap != "" ? gap : 'LEADER';
  }

  retrieveGapToAhead(stopped: boolean, gap: string) {
    if (stopped) {
      return "-";
    }
    if (gap != "" && gap.search('L')) {
      var newGap = gap.replaceAll('L', " LAPS")
      return newGap;
    }
    return gap != "" ? gap : 'INTERVAL';
  }

  getTyreColor(tyre: string | undefined): string {
    switch (tyre) {
      case 'SOFT':
        return 'red';
      case 'MEDIUM':
        return 'yellow';
      case 'HARD':
        return 'white';
      case 'INTERMEDIATE':
        return 'lightgreen';
      case 'WET':
        return 'blue';
      default:
        return 'black';
    }
  }

  retrieveTyre(tyre: string | undefined) {
    if (tyre == undefined) return "";
    else {
      return tyre.charAt(0);
    }
  }


  retrieveResultSession(paramValue: any) {
    if (this.retrieveType(paramValue) == TypeResult.RACE) {
      this.resultType = TypeResult.RACE;
      return this.timingRaceResultService.getResultRace(paramValue).pipe(
        retry(3),
        catchError((error) => {
          console.error("errore chiamata:", error);
          return throwError('ERRORE');
        }),
        tap((data: TimingRaceResult) => {
          console.log("TIMING", data);
          const linesArray = Object.entries(data.Lines);
          linesArray.sort((a, b) => {
            const positionA = a[1].Position;
            const positionB = b[1].Position;
            return positionA.localeCompare(positionB, undefined, { numeric: true });
          });
          const sortedLines: Line[] = linesArray.map(([key, value]) => value);
          data.Lines = sortedLines;
          this.raceResult$ = of(data); // Salva il risultato nella variabile raceResult$
        })
      );
    } else if (this.retrieveType(paramValue) == TypeResult.PRACTICE) {
      this.resultType = TypeResult.PRACTICE;
      return this.timingRaceResultService.getResultPractice(paramValue).pipe(
        retry(3),
        catchError((error) => {
          console.error("errore chiamata:", error);
          return throwError('ERRORE');
        }),
        tap((data: TimingPracticeResult) => {
          console.log("PRACTICE", data);
          const linesArray = Object.entries(data.Lines);
          linesArray.sort((a, b) => {
            const positionA = a[1].Position;
            const positionB = b[1].Position;
            return positionA.localeCompare(positionB, undefined, { numeric: true });
          });
          const sortedLines: Line[] = linesArray.map(([key, value]) => value);
          data.Lines = sortedLines;
          this.raceResult$ = of(data); // Salva il risultato nella variabile raceResult$
        })
      );
    } else if (this.retrieveType(paramValue) == TypeResult.QUALIFYING) {
      this.resultType = TypeResult.QUALIFYING;
      return this.timingRaceResultService.getResultQualifying(paramValue).pipe(
        retry(3),
        catchError((error) => {
          console.error("errore chiamata:", error);
          return throwError('ERRORE');
        }),
        tap((data: TimingQualifyingResult) => {
          console.log("QUALIFYING", data);
          const linesArray = Object.entries(data.Lines);
          linesArray.sort((a, b) => {
            const positionA = a[1].Position;
            const positionB = b[1].Position;
            return positionA.localeCompare(positionB, undefined, { numeric: true });
          });
          const sortedLines: Line[] = linesArray.map(([key, value]) => value);
          data.Lines = sortedLines;
          this.raceResult$ = of(data);
        })
      );
    }
    return this.timingRaceResultService.getResultRace(paramValue).pipe(
      retry(3),
      catchError((error) => {
        console.error("errore chiamata:", error);
        return throwError('ERRORE');
      }),);
  }

  retrieveType(path: any) {
    if (path.search("_Race") > 0) {
      return TypeResult.RACE;
    }
    if (path.search("_Practice") > 0) {
      return TypeResult.PRACTICE;
    }
    if (path.search("_Qualifying") > 0) {
      return TypeResult.QUALIFYING;
    }
    return "";
  }

}
