import { Component, Input, OnInit } from '@angular/core';
import { RaceMessageControl } from '../../../models/RaceMessageControl/RaceMessage';
import { RaceMessageService } from '../../../Services/RaceMessageService';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-race-controls',
  templateUrl: './race-controls.component.html',
  styleUrl: './race-controls.component.scss'
})
export class RaceControlsComponent implements OnInit{
  @Input() path!: string | null;
  
  raceMessage$: Observable<RaceMessageControl> = new Observable<RaceMessageControl>;

  constructor(private raceMessageService: RaceMessageService){
  }

  ngOnInit(): void {
    this.raceMessage$ = this.raceMessageService.getRaceControlMessages(this.path).pipe(
      retry(3),
      catchError((error) => {
        console.error("errore chiamata:", error);
        return throwError('ERRORE');
      }),
      map((data: RaceMessageControl) => {
        console.log("Message", data);
        return data;
      })
    );
    console.log(this.raceMessage$.subscribe())
  }




}
