import { useState } from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import type { DateRange } from './types';
import "./style/app.css";

export default function App() {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Date Range Picker</h1>
        <div className="date-range-picker-wrapper">
          <DateRangePicker
            selectedRange={selectedRange}
            onChange={setSelectedRange}
            placeholder="Select your date range"
          />
        </div>
      </div>
    </div>
  );
}
