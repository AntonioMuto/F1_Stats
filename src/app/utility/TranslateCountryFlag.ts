
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TranslateCountryFlag {
    myMap = new Map<string, string>([
          ['BRN', 'BH'],
          ['KSA', 'SA'],
          ['AUS', 'AU'],
          ['ITA', 'IT'],
          ['ESP', 'ES'],
          ['MON', 'MC'],
          ['AZE', 'AZ'],
          ['CAN', 'CA'],
          ['USA', 'US'],
          ['GBR', 'GB'],
          ['AUT', 'AT'],
          ['FRA', 'FR'],
          ['HUN', 'HU'],
          ['BEL', 'BE'],
          ['NED', 'NL'],
          ['SGP', 'SG'],
          ['JPN', 'JP'],
          ['MEX', 'MX'],
          ['BRA', 'BR'],
          ['UAE', 'AE'],
          ['QAT', 'QA'],
          ['POR', 'PT'],
          ['RUS', 'RU'],
          ['TUR', 'TR'],
          ['CHN', 'CN'],
          ['GER', 'DE']
        ]);
  }