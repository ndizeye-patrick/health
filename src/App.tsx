import { useState} from 'react';
import { Activity } from 'lucide-react';
import { CountrySelector } from './components/CountrySelector';
import { MetricChart } from './components/MetricChart';
import { FilterPanel } from './components/FilterPanel';
import { useHealthData } from './hooks/useHealthData';
import { HEALTH_METRICS } from './config/metrics';
import type { Country } from './types';

function App() {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [currentMetric, setCurrentMetric] = useState(HEALTH_METRICS[0].id);
  const [yearRange, setYearRange] = useState({ start: 2015, end: 2023 });

  const { chartData, loading, error } = useHealthData({
    selectedCountries,
    currentMetric,
    yearRange,
  });

  const currentMetricInfo = HEALTH_METRICS.find((m) => m.id === currentMetric);

  // Helper Functions
  const handleCountrySelect = (country: Country) => {
    if (selectedCountries.length >= 3) {
      alert('You can only select up to 3 countries.');
      return;
    }
    setSelectedCountries([...selectedCountries, country]);
  };

  const handleCountryRemove = (countryCode: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c.code !== countryCode));
  };

  const handleYearRangeChange = (start: number, end: number) => {
    setYearRange({ start, end });
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Global Health Statistics Dashboard
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: Country Selector & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Country Selector */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Select Countries</h2>
              <CountrySelector
                selectedCountries={selectedCountries}
                onCountrySelect={handleCountrySelect}
                onCountryRemove={handleCountryRemove}
              />
            </div>

            {/* Filter Panel */}
            <FilterPanel
              onYearRangeChange={handleYearRangeChange}
              onMetricChange={setCurrentMetric}
            />
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            {/* Error State displaying error on consol and provide user friendly error message users */}
            {error && (
              <>
                {console.error("Offline Error:", error)}
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96 transform transition hover:scale-105 hover:shadow-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9V6.75a3 3 0 013-3h0a3 3 0 013 3V9m3 12H6m0 0a3 3 0 01-3-3v-3a3 3 0 013-3h12a3 3 0 013 3v3a3 3 0 01-3 3zm3-12v3"
                      />
                    </svg>
                    <h1 className="text-xl font-semibold mt-4 text-gray-800">
                      You Are Offline
                    </h1>
                    <p className="text-gray-500 mt-2">
                      Please check your internet connection to continue.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-300">
                      Try Again
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : // Chart Display
            selectedCountries.length > 0 ? (
              <MetricChart
                data={chartData}
                metric={currentMetricInfo?.name || "Metric"}
                unit={currentMetricInfo?.unit}
                title={currentMetricInfo?.description || "Description"}
              />
            ) : (
              // Empty State
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-[400px] text-gray-500">
                <Activity className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg">
                  Select countries to view health statistics
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;