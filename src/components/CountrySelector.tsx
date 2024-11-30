import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Country } from '../types';
import { COUNTRIES } from '../config/countries';

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryCode: string) => void;
}

export function CountrySelector({
  selectedCountries,
  onCountrySelect,
  onCountryRemove,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCountries.find((selected) => selected.code === country.code)
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedCountries.map((country) => (
          <span
            key={country.code}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {country.name}
            <button
              onClick={() => onCountryRemove(country.code)}
              className="ml-2 hover:text-blue-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2 text-left border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          isOpen && 'border-blue-500'
        )}
      >
        <span>{selectedCountries.length === 0 ? 'Select countries' : `${selectedCountries.length} selected`}</span>
        <ChevronsUpDown className="w-4 h-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full px-4 py-2 border-b"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  onCountrySelect(country);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex items-center w-full px-4 py-2 text-left hover:bg-gray-100',
                  'focus:outline-none focus:bg-gray-100'
                )}
              >
                <span className="flex-grow">{country.name}</span>
                {selectedCountries.find((selected) => selected.code === country.code) && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}