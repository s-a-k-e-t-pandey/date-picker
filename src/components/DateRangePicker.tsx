import { useState, useEffect, useRef } from 'react';
import type { DateRange } from '../types';
import { Calendar } from 'lucide-react';
import { CalendarComp } from './Calendar';
import '../style/components/date-range-picker.css';

export const DateRangePicker: React.FC<{
  onChange?: (range: DateRange) => void;
  value?: DateRange;
  placeholder?: string;
  selectedRange?: DateRange;
}> = ({ onChange, value, placeholder = 'Select date range', selectedRange }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempDates, setTempDates] = useState<DateRange>(value || { start: null, end: null });
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<DateRange>(value || { start: null, end: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [yearRange, setYearRange] = useState({
    start: Math.floor(new Date().getFullYear() / 12) * 12 - 6,
    end: Math.floor(new Date().getFullYear() / 12) * 12 + 6,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarVisible(false);
        setShowMonthPicker(false);
        setShowYearPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setTempDates(value);
      setSelectedDates(value);
    }
  }, [value]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (!tempDates.start || (tempDates.start && tempDates.end)) {
      setTempDates({ start: clickedDate, end: null });
    } else {
      if (clickedDate < tempDates.start) {
        setTempDates({ start: clickedDate, end: tempDates.start });
      } else {
        setTempDates({ ...tempDates, end: clickedDate });
      }
    }
  };

  const handleMonthClick = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month));
    setShowMonthPicker(false);
  };

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth()));
    setShowYearPicker(false);
  };

  const handleYearRangeChange = (direction: number) => {
    const change = direction * 12;
    setYearRange({
      start: yearRange.start + change,
      end: yearRange.end + change,
    });
  };

  const handleNavigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction));
  };

  const handleCancel = () => {
    setTempDates(selectedDates);
    setIsCalendarVisible(false);
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  const handleApply = () => {
    if (tempDates.start && tempDates.end) {
      setSelectedDates(tempDates);
      onChange?.(tempDates);
      setIsCalendarVisible(false);
      setShowMonthPicker(false);
      setShowYearPicker(false);
    }
  };

  const handleToggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  const handleToggleMonthPicker = () => {
    setShowMonthPicker(!showMonthPicker);
    setShowYearPicker(false);
  };

  const handleToggleYearPicker = () => {
    setShowYearPicker(!showYearPicker);
    setShowMonthPicker(false);
  };

  const displayValue = selectedRange && selectedRange.start && selectedRange.end
    ? `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
    : selectedDates.start && selectedDates.end
    ? `${selectedDates.start.toLocaleDateString()} - ${selectedDates.end.toLocaleDateString()}`
    : '';

  return (
    <div ref={containerRef} className="date-range-picker">
      <div
        className="date-range-picker__input-wrapper"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleCalendar();
          }
        }}
      >
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          value={displayValue}
          readOnly
          className="date-range-picker__input"
          onClick={handleToggleCalendar}
        />
        <span className="date-range-picker__icon-wrapper"   onClick={() => inputRef.current && inputRef.current.focus()}>
          <Calendar className="date-range-picker__icon" size={20} onClick={handleToggleCalendar}/>
        </span>
      </div>

      <div className={`date-range-picker__calendar ${isCalendarVisible ? 'calendar--visible' : ''}`}>
        <CalendarComp
          isVisible={isCalendarVisible}
          currentDate={currentDate}
          tempDates={tempDates}
          showMonthPicker={showMonthPicker}
          showYearPicker={showYearPicker}
          yearRange={yearRange}
          onDateClick={handleDateClick}
          onMonthClick={handleMonthClick}
          onYearClick={handleYearClick}
          onNavigateMonth={handleNavigateMonth}
          onYearRangeChange={handleYearRangeChange}
          onCancel={handleCancel}
          onApply={handleApply}
          onToggleMonthPicker={handleToggleMonthPicker}
          onToggleYearPicker={handleToggleYearPicker}
        />
      </div>
    </div>
  );
};
