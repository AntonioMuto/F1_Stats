import { Component, Input } from '@angular/core';
import { RaceMessageControl } from '../../../models/RaceMessageControl/RaceMessage';

@Component({
  selector: 'app-race-controls',
  templateUrl: './race-controls.component.html',
  styleUrl: './race-controls.component.scss'
})
export class RaceControlsComponent {
  @Input() raceMessage!: RaceMessageControl | null;

  constructor(){}



}
