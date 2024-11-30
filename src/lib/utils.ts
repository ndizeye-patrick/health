import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export async function fetchHealthData(indicator: string, filter?: string) {
  try {
    const baseUrl = 'https://ghoapi.azureedge.net/api';
    const url = `${baseUrl}/${encodeURIComponent(indicator)}${filter ? `?$filter=${encodeURIComponent(filter)}` : ''}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        'Origin': window.location.origin,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    if (!data || typeof data !== 'object' || !('value' in data)) {
      throw new Error('Unexpected API response format');
    }

    return data;
  } catch (error) {
    console.error('Error fetching health data:', error);
    throw error; // Re-throw the error for higher-level handling
  }
}
