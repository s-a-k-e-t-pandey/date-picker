import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../style/components/year-picker.css";

export const YearPicker: React.FC<{
  currentDate: Date;
  yearRange: { start: number; end: number };
  onYearClick: (year: number) => void;
  onYearRangeChange: (direction: number) => void;
}> = ({ currentDate, yearRange, onYearClick, onYearRangeChange }) => {
  const years = Array.from({ length: 12 }, (_, i) => yearRange.start + i);

  return (
    <div className="year-picker">
      <div className="year-picker__header">
        <Button
          onClick={() => onYearRangeChange(-1)}
          className="year-picker__nav"
          disabled={yearRange.start <= 1900}
        >
          <ChevronLeft size={16} />
        </Button>

        <span className="year-picker__range">
          {yearRange.start} - {yearRange.end}
        </span>

        <Button
          onClick={() => onYearRangeChange(1)}
          className="year-picker__nav"
          disabled={yearRange.end >= 3000}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      <div className="year-picker__grid">
        {years.map((year) => {
          const isSelected = currentDate.getFullYear() === year;
          return (
            <Button
              key={year}
              onClick={() => onYearClick(year)}
              className={`year-picker__Button ${isSelected ? 'year-picker__Button--selected' : ''}`}
            >
              {year}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
