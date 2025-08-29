export interface YearlyRecord {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  [key: string]: number | undefined;
}

export interface CountryData {
  iso_code?: string;
  data: YearlyRecord[];
}
export interface Database {
  [countryName: string]: CountryData;
}
