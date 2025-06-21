import { useState } from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import type { DateRange } from './types';
import "./style/app.css";

export default function App() {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });

  const handleRangeChange = (range: DateRange) => {
    setSelectedRange(range);
    console.log('Selected range:', range);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Date Range Picker</h1>

        <div className="date-range-picker-wrapper">
          <DateRangePicker
            onChange={handleRangeChange}
            value={selectedRange}
            placeholder="Select your date range"
          />

          {selectedRange.start && selectedRange.end && (
            <div className="selected-range-box">
              <p className="selected-range-label">Selected Range:</p>
              <p className="selected-range-value">
                {selectedRange.start.toLocaleDateString()} - {selectedRange.end.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
