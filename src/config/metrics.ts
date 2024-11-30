import { HealthMetric } from '../types';

export const HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'WHOSIS_000001',
    name: 'Life Expectancy',
    description: 'Life expectancy at birth (years)',
    unit: 'years'
  },
  {
    id: 'MDG_0000000001',
    name: 'Infant Mortality',
    description: 'Infant mortality rate (probability of dying between birth and age 1 per 1000 live births)',
    unit: 'per 1000 live births'
  },
  {
    id: 'HWF_0001',
    name: 'Health Workers',
    description: 'Health worker density per 1000 population',
    unit: 'per 1000 population'
  },
  {
    id: 'SA_0000001688',
    name: 'Immunization Coverage',
    description: 'Immunization coverage among 1-year-olds (%)',
    unit: '%'
  }
];