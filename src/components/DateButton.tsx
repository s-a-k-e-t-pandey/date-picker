import type { DateRange } from "../types";
import { isSameDate, isDateInRange } from '../utils/utils';
import "../style/components/date-button.css";

export const DateButton: React.FC<{
  day: number;
  currentDate: Date;
  tempDates: DateRange;
  onDateClick: (day: number) => void;
  onDateHover: (day: number) => void;
  isEmpty?: boolean;
  isHoverPreview?: boolean;
  isHoverInRange?: boolean;
  isHoverStart?: boolean;
  isHoverEnd?: boolean;
}> = ({ 
  day, 
  currentDate, 
  tempDates, 
  onDateClick, 
  onDateHover,
  isEmpty = false,
  isHoverPreview = false,
  isHoverInRange = false,
  isHoverStart = false,
  isHoverEnd = false
}) => {
  if (isEmpty) {
    return <div className="date-btn date-btn--empty"></div>;
  }

  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const isToday = isSameDate(date, new Date());
  const isSelected = isDateInRange(date, tempDates);
  
  const isStart = tempDates.start && isSameDate(date, tempDates.start);
  const isEnd = tempDates.end && isSameDate(date, tempDates.end);
  const isRangeStart = tempDates.start && tempDates.end && isSameDate(date, tempDates.start < tempDates.end ? tempDates.start : tempDates.end);
  const isRangeEnd = tempDates.start && tempDates.end && isSameDate(date, tempDates.start > tempDates.end ? tempDates.start : tempDates.end);

  let buttonClasses = 'date-btn';
  
  // Handle hover preview states
  if (isHoverStart) {
    buttonClasses += ' date-btn--hover-start';
  } else if (isHoverEnd) {
    buttonClasses += ' date-btn--hover-end';
  } else if (isHoverInRange) {
    buttonClasses += ' date-btn--hover-range';
  } else if (isHoverPreview && !isSelected) {
    buttonClasses += ' date-btn--hover-preview';
  }
  
  // Handle actual selection states
  if (isRangeStart || isRangeEnd) {
    buttonClasses += ' date-btn--range-endpoint';
  } else if (isSelected) {
    buttonClasses += ' date-btn--in-range';
  }

  if (isToday) {
    buttonClasses += ' date-btn--today';
  }

  return (
    <button
      className={buttonClasses}
      onClick={() => onDateClick(day)}
      onMouseEnter={() => onDateHover(day)}
      onMouseLeave={() => onDateHover(-1)} // Reset hover
    >
      {day}
    </button>
  );
};
