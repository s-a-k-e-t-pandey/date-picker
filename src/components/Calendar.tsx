import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DateRange } from '../types';
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/utils";
import { DateButton } from './DateButton';
import { Button } from './Button';
import { MonthPicker } from './MonthPicker';
import { YearPicker } from './YearPicker';
import "../style/components/calendar.css";

export const CalendarComp: React.FC<{
  isVisible: boolean;
  currentDate: Date;
  tempDates: DateRange;
  showMonthPicker: boolean;
  showYearPicker: boolean;
  yearRange: { start: number; end: number };
  onDateClick: (day: number) => void;
  onMonthClick: (month: number) => void;
  onYearClick: (year: number) => void;
  onNavigateMonth: (direction: number) => void;
  onYearRangeChange: (direction: number) => void;
  onCancel: () => void;
  onApply: () => void;
  onToggleMonthPicker: () => void;
  onToggleYearPicker: () => void;
}> = ({
  isVisible,
  currentDate,
  tempDates,
  showMonthPicker,
  showYearPicker,
  yearRange,
  onDateClick,
  onMonthClick,
  onYearClick,
  onNavigateMonth,
  onYearRangeChange,
  onCancel,
  onApply,
  onToggleMonthPicker,
  onToggleYearPicker
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  if (!isVisible) return null;

  const renderCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(
        <DateButton
          key={`empty-${i}`}
          day={0}
          currentDate={currentDate}
          tempDates={tempDates}
          onDateClick={onDateClick}
          isEmpty={true}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(
        <DateButton
          key={day}
          day={day}
          currentDate={currentDate}
          tempDates={tempDates}
          onDateClick={onDateClick}
        />
      );
    }

    return dates;
  };

  return (
    <div className={`calendar ${isVisible ? 'calendar--visible' : ''}`}>
      {/* Header */}
      <div className="calendar__header">
        <button onClick={() => onNavigateMonth(-1)} className="calendar__nav-button">
          <ChevronLeft size={18} />
        </button>

        <div className="calendar__title">
          <button onClick={onToggleMonthPicker} className="calendar__title-button">
            {monthNames[currentDate.getMonth()]}
          </button>
          <button onClick={onToggleYearPicker} className="calendar__title-button">
            {currentDate.getFullYear()}
          </button>
        </div>

        <button onClick={() => onNavigateMonth(1)} className="calendar__nav-button">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Pickers or Dates */}
      {showMonthPicker ? (
        <MonthPicker currentDate={currentDate} onMonthClick={onMonthClick} />
      ) : showYearPicker ? (
        <YearPicker
          currentDate={currentDate}
          yearRange={yearRange}
          onYearClick={onYearClick}
          onYearRangeChange={onYearRangeChange}
        />
      ) : (
        <>
          <div className="calendar__weekdays">
            {dayNames.map(day => (
              <div key={day} className="calendar__weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar__dates">
            {renderCalendarDates()}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="calendar__actions">
        <Button onClick={onCancel} variant="secondary" size="small">
          Cancel
        </Button>
        <Button
          onClick={onApply}
          variant="primary"
          size="small"
          disabled={!tempDates.start || !tempDates.end}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
