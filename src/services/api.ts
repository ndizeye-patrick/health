const API_BASE_URL = 'https://ghoapi.azureedge.net/api';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export async function fetchHealthData(indicator: string, filter?: string): Promise<{ value: HealthData[] }> {
  try {
    if (!indicator) throw new Error('Indicator parameter is required');

    const url = `${API_BASE_URL}/${indicator}${filter ? `?$filter=${filter} ne null` : ''}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(CORS_PROXY + url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Host: 'ghoapi.azureedge.net',
      },
      credentials: 'omit',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, response.statusText, errorText);
      throw new Error(`Failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!Array.isArray(data.value)) {
      throw new Error('Invalid response format: "value" must be an array');
    }

    return data;
  } catch (error) {
    console.error('Fetch Health Data Error:', error);
    throw error;
  }
}
