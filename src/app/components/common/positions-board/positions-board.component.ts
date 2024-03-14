import { Component, Input } from '@angular/core';
import { DriverInfo } from '../../../models/DriverList/DriverInfo';
import { TypeResult } from '../../../models/Enum/TypeResult.enum';
import { ResultService } from '../../../Services/resultService';
import { TimingRaceResult } from '../../../models/RaceResult/TimingRaceResult';
import { TimingPracticeResult } from '../../../models/PracticeResult/TimingPracticesResult';
import { Stints } from '../../../models/TyreStint/Stints';
import { TimingQualifyingResult } from '../../../models/QualifyingResult/TimingQualifyingResult';

@Component({
  selector: 'app-positions-board',
  templateUrl: './positions-board.component.html',
  styleUrl: './positions-board.component.scss'
})
export class PositionsBoardComponent {
  @Input() drivers: { [key: string]: DriverInfo } = {};
  @Input() typeSession: TypeResult | undefined;
  @Input() dataBoards: TimingRaceResult | TimingPracticeResult | TimingQualifyingResult | null | undefined;
  @Input() tyreInfo: Stints | null | undefined;

  constructor(
  ) {
  }

  isRowExpanded: boolean[] = [];

  toggleRow(index: number) {
    this.isRowExpanded[index] = !this.isRowExpanded[index];
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

  retrieveGapToLeader(line: any,typeSession: TypeResult | undefined) {
    if(typeSession === "Race"){
      if (line.Stopped) {
        return "-";
      }
      if (line.GapToLeader != "" && line.GapToLeader.search('L')) {
        var newGap = line.GapToLeader.replaceAll('L', " LAPS")
        return newGap;
      }
      return line.GapToLeader != "" ? line.GapToLeader : 'LEADER';
    }
    if(typeSession === "Practice"){
      if (line.Stopped) {
        return "-";
      }
      if (line.TimeDiffToFastest != "" && line.TimeDiffToFastest.search('L')) {
        var newGap = line.TimeDiffToFastest.replaceAll('L', " LAPS")
        return newGap;
      }
      return line.TimeDiffToFastest != "" ? line.TimeDiffToFastest : 'LEADER';
    }
    if(typeSession === "Qualifying"){
      if (line.Stopped) {
        return "-";
      }
      if(line.BestLapTime.Value.trim != ""){
        if(line.BestLapTimes.length > 0 && line.BestLapTimes[0].Value != ""){
          return line.BestLapTimes[0].Value;
        } else {
          return "-"
        }
      } 
    }
  }

  retrieveGapToAhead(line: any,typeSession: TypeResult | undefined) {
    if(typeSession === "Race"){
      if (line.Stopped) {
        return "-";
      }
      if (line.TimeDiffToPositionAhead != "" && line.TimeDiffToPositionAhead.search('L')) {
        var newGap = line.TimeDiffToPositionAhead.replaceAll('L', " LAPS")
        return newGap;
      }
      return line.TimeDiffToPositionAhead != "" ? line.TimeDiffToPositionAhead : 'LEADER';
    }
    if(typeSession === "Practice"){
      if (line.Stopped) {
        return "-";
      }
      if (line.TimeDiffToPositionAhead != "" && line.TimeDiffToPositionAhead.search('L')) {
        var newGap = line.TimeDiffToPositionAhead.replaceAll('L', " LAPS")
        return newGap;
      }
      return line.TimeDiffToPositionAhead != "" ? line.TimeDiffToPositionAhead : 'INTERVALS';
    }
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
}
