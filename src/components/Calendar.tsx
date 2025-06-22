import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
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
  const [hoveredDay, setHoveredDay] = useState<number>(-1);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  if (!isVisible) return null;

  const getHoverRange = (hoveredDay: number): DateRange => {
    if (hoveredDay === -1) return { start: null, end: null };
    
    const hoveredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), hoveredDay);
    
    if (!tempDates.start) {
      return { start: hoveredDate, end: null };
    }
    
    if (tempDates.start && !tempDates.end) {
      return {
        start: tempDates.start < hoveredDate ? tempDates.start : hoveredDate,
        end: tempDates.start < hoveredDate ? hoveredDate : tempDates.start
      };
    }
    
    return tempDates;
  };

  const isDateInHoverRange = (day: number, hoverRange: DateRange): boolean => {
    if (!hoverRange.start || !hoverRange.end) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date >= hoverRange.start && date <= hoverRange.end;
  };

  const isHoverRangeStart = (day: number, hoverRange: DateRange): boolean => {
    if (!hoverRange.start) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.getTime() === hoverRange.start.getTime();
  };

  const isHoverRangeEnd = (day: number, hoverRange: DateRange): boolean => {
    if (!hoverRange.end) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.getTime() === hoverRange.end.getTime();
  };

  const handleDateHover = (day: number) => {
    setHoveredDay(day);
  };

  const renderCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const dates = [];
    const hoverRange = getHoverRange(hoveredDay);

    for (let i = 0; i < firstDay; i++) {
      dates.push(
        <DateButton
          key={`empty-${i}`}
          day={0}
          currentDate={currentDate}
          tempDates={tempDates}
          onDateClick={onDateClick}
          onDateHover={handleDateHover}
          isEmpty={true}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isHoverPreview = hoveredDay === day;
      const isHoverInRange = isDateInHoverRange(day, hoverRange) && hoveredDay !== -1;
      const isHoverStart = isHoverRangeStart(day, hoverRange) && hoveredDay !== -1;
      const isHoverEnd = isHoverRangeEnd(day, hoverRange) && hoveredDay !== -1;

      dates.push(
        <DateButton
          key={day}
          day={day}
          currentDate={currentDate}
          tempDates={tempDates}
          onDateClick={onDateClick}
          onDateHover={handleDateHover}
          isHoverPreview={isHoverPreview}
          isHoverInRange={isHoverInRange}
          isHoverStart={isHoverStart}
          isHoverEnd={isHoverEnd}
        />
      );
    }

    return dates;
  };

  return (
    <div className={`calendar ${isVisible ? 'calendar--visible' : ''}`}>
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

          <div 
            className="calendar__dates"
            onMouseLeave={() => setHoveredDay(-1)}
          >
            {renderCalendarDates()}
          </div>
        </>
      )}

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