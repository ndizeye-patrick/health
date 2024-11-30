import React from 'react'; import { Filter } from 'lucide-react'; import { cn } from '../lib/utils'; import { HEALTH_METRICS } from '../config/metrics';  interface FilterPanelProps {   onYearRangeChange: (start: number, end: number) => void;   onMetricChange: (metric: string) => void;   className?: string; }  export function FilterPanel({   onYearRangeChange,   onMetricChange,   className, }: FilterPanelProps) {   const [startYear, setStartYear] = React.useState<number>(2015);   const [endYear, setEndYear] = React.useState<number>(2023);    const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {     const value = e.target.value === '' ? 2015 : Math.max(2015, Math.min(2023, parseInt(e.target.value, 10)));     setStartYear(value);     onYearRangeChange(value, endYear);   };    const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {     const value = e.target.value === '' ? 2023 : Math.max(2015, Math.min(2023, parseInt(e.target.value, 10)));     setEndYear(value);     onYearRangeChange(startYear, value);   };    return (     <div className={cn('bg-white p-6 rounded-lg shadow-md', className)}>       <div className="flex items-center gap-2 mb-4">         <Filter className="w-5 h-5" />         <h3 className="text-lg font-semibold">Filters</h3>       </div>        <div className="space-y-4">         <div>           <label className="block text-sm font-medium text-gray-700 mb-2">             Year Range           </label>           <div className="flex items-center gap-2">             <input               type="number"               min={2015}               max={2023}               value={startYear}               onChange={handleStartYearChange}               className="w-24 px-3 py-2 border rounded-md"             />             <span>to</span>             <input               type="number"               min={2015}               max={2023}               value={endYear}               onChange={handleEndYearChange}               className="w-24 px-3 py-2 border rounded-md"             />           </div>         </div>          <div>           <label className="block text-sm font-medium text-gray-700 mb-2">             Health Metric           </label>           <select             onChange={(e) => onMetricChange(e.target.value)}             className="w-full px-3 py-2 border rounded-md"             defaultValue={HEALTH_METRICS[0].id}           >             {HEALTH_METRICS.map((metric) => (               <option key={metric.id} value={metric.id}>                 {metric.name}               </option>             ))}           </select>         </div>         {/* <div>           <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Region/Continent</label>           <select>               countries.map((country, index) = (                 <option key={index}>{}</option>               ))           </select>         </div> */}       </div>     </div>   ); }