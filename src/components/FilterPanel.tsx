import { useState } from 'react'
import { Filter } from 'lucide-react'
import { cn } from '../lib/utils'
import { HEALTH_METRICS } from '../config/metrics'

interface FilterPanelProps {
  onYearRangeChange: (start: number, end: number) => void
  onMetricChange: (metric: string) => void
  className?: string
}

export function FilterPanel({
  onYearRangeChange,
  onMetricChange,
  className,
}: FilterPanelProps) {
  const [start, setStartYear] = useState<number>(2015)
  const [end, setEndYear] = useState<number>(2023)
  const [yearError, setYearError] = useState<string>('')

  const handleYearChange = (value: string, isStart: boolean) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 4)
    const year = parseInt(numericValue, 10)

    if (isStart) {
      setStartYear(year || 2015)
    } else {
      setEndYear(year || 2023)
    }

    if (numericValue.length === 4) {
      if (year < 2015 || year > 2023) {
        setYearError('Year must be between 2015 and 2023')
      } else {
        const startYear = isStart ? year : start
        const endYear = isStart ? end : year

        if (startYear <= endYear) {
          setYearError('')
          onYearRangeChange(startYear, endYear)
        } else {
          setYearError('Start year must be before or equal to end year')
        }
      }
    } else {
      setYearError('')
    }
  }

  return (
    <div className={cn('bg-white p-6 rounded-lg shadow-md', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              value={start}
              onChange={(e) => handleYearChange(e.target.value, true)}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="2015"
              aria-label="Start year"
              autoComplete="off"
            />
            <span>to</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              value={end}
              onChange={(e) => handleYearChange(e.target.value, false)}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="2023"
              aria-label="End year"
              autoComplete="off"
            />
          </div>
          {yearError && <p className="text-red-500 text-xs mt-1">{yearError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Health Metric
          </label>
          <select
            onChange={(e) => onMetricChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            defaultValue={HEALTH_METRICS[0].id}
            aria-label="Select health metric"
          >
            {HEALTH_METRICS.map((metric) => (
              <option key={metric.id} value={metric.id}>
                {metric.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}