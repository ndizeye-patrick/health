import { useState, useEffect } from 'react';
import { HealthData, Country } from '../types';
import { fetchHealthData } from '../services/api';

interface ChartData {
  year: number;
  [country: string]: number;
}

interface UseHealthDataProps {
  selectedCountries: Country[];
  currentMetric: string;
  yearRange: { start: number; end: number };
}

export function useHealthData({ selectedCountries, currentMetric, yearRange }: UseHealthDataProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCountries.length === 0 || !currentMetric) {
      setChartData([]);
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Create filter string for API call
        const countryFilter = selectedCountries
            .map((c) => `SpatialDim eq '${c.code}'`)
            .join(' or ');
        const filter = `(${countryFilter}) and TimeDim ge ${yearRange.start} and TimeDim le ${yearRange.end}`;

        const data = await fetchHealthData(currentMetric, filter);

        if (!isMounted) return;

        // Transform API data to chart-friendly format
        const processedData = data.value.reduce((acc: ChartData[], item: HealthData) => {
          const year = item.TimeDim;
          const country = selectedCountries.find((c) => c.code === item.SpatialDim);

          if (!country) return acc;

          const existingYear = acc.find((d) => d.year === year);
          if (existingYear) {
            existingYear[country.name] = item.Value
          } else {
            acc.push({ year, [country.name]:item.Value});
          }
          return acc;
        }, []);

        setChartData(processedData.sort((a, b) => a.year - b.year));
      } catch (err) {
        if (isMounted) {
          setError((err as Error)?.message || 'An error occurred while fetching data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedCountries, currentMetric, yearRange]);

  return { chartData, loading, error };
}
