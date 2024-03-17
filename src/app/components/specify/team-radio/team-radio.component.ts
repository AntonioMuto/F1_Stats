import { Component, Input, input } from '@angular/core';
import { Capture } from '../../../models/TeamsRadio/Capture';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { TeamRadioService } from '../../../Services/TeamRadio';
import { DriverInfo } from '../../../models/DriverList/DriverInfo';
import { Track } from 'ngx-audio-player';
import { ApiConfig } from '../../../../assets/config';

@Component({
  selector: 'app-team-radio',
  templateUrl: './team-radio.component.html',
  styleUrl: './team-radio.component.scss'
})
export class TeamRadioComponent {
  @Input() pathApi!: string | null;
  @Input() drivers: { [key: string]: DriverInfo } = {};

  teamRadio$: Observable<Capture> = new Observable<Capture>;

  audioTitle: string = "";
  audioUrl: string = '';
  showPlayer: boolean = false;

  constructor(private teamRadioService: TeamRadioService) { }

  ngOnInit(): void {
    this.teamRadio$ = this.teamRadioService.getTeamsRadio(this.pathApi).pipe(
      retry(3),
      catchError((error) => {
        console.error("errore chiamata:", error);
        return throwError('ERRORE');
      }),
      map((data: Capture) => {
        console.log("RADIO", data);
        return data;
      })
    );
  }

  retrieveAudio() {
    return this.audioUrl;
  }

  playAudio(pathAudio: string, driver: string) {
    this.showPlayer = true;
    this.audioUrl = `${ApiConfig.BASE_URL_API}${this.pathApi}${pathAudio}`;
    this.audioTitle = driver + " - " + this.formatDateTime(pathAudio);
  }

  retrieveTitle() {
    return this.audioTitle;
  }

  formatDateTime(time: string) {
    const regex = /(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})\.mp3$/;
    const match = regex.exec(time);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const hour = match[4];
      const minute = match[5];
      const second = match[6];

      const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return formattedDateTime;
    } else{
      return "NOT AVAIBLE";
    }
  }
}
