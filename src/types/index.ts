export interface HealthMetric {
  id: string;
  name: string;
  description: string;
  unit?: string;
}

export interface HealthData {
  
  Id: string;
  IndicatorCode: string;
  NumericValue?: number; // Optional property
  Low?: number; // Optional property
  High?: number;
  SpatialDim: string; // Updated from CountryCode based on your API
  Country: string;
  TimeDim: number;
  Value: number;
  Type: string;
  
}

export type Country = {
  code: string;      // ISO 3166-1 alpha-3 country code
  name: string;      // Full name of the country
  region?: string;   // Geographical region
  parentLocationCode?: string; // Parent location code (e.g., "EUR")
  parentLocation?: string;  // Parent location name (e.g., "Europe")
  population?: number;
  flag?: string;
};
