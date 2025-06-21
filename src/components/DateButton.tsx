import type{ DateRange } from "../types";
import { isSameDate, isDateInRange } from '../utils/utils'
import "../style//components/date-button.css"




export const DateButton: React.FC<{
  day: number;
  currentDate: Date;
  tempDates: DateRange;
  onDateClick: (day: number) => void;
  isEmpty?: boolean;
}> = ({ day, currentDate, tempDates, onDateClick, isEmpty = false }) => {
  if (isEmpty) {
    return <div className="w-10 h-10"></div>;
  }

  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const isToday = isSameDate(date, new Date());
  const isSelected = isDateInRange(date, tempDates);
  
  const isStart = tempDates.start && isSameDate(date, tempDates.start);
  const isEnd = tempDates.end && isSameDate(date, tempDates.end);
  const isRangeStart = tempDates.start && tempDates.end && isSameDate(date, tempDates.start < tempDates.end ? tempDates.start : tempDates.end);
  const isRangeEnd = tempDates.start && tempDates.end && isSameDate(date, tempDates.start > tempDates.end ? tempDates.start : tempDates.end);

  let buttonClasses = 'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer border-none outline-none';
  
  if (isRangeStart || isRangeEnd) {
    buttonClasses += ' bg-blue-600 text-white font-bold';
  } else if (isSelected) {
    buttonClasses += ' bg-gray-500 text-white border-t border-b border-dashed border-gray-300';
  } else {
    buttonClasses += ' text-gray-100 hover:bg-gray-600';
  }

  if (isToday) {
    buttonClasses += ' ring-2 ring-blue-400';
  }

  return (
    <button
      className={buttonClasses}
      onClick={() => onDateClick(day)}
    >
      {day}
    </button>
  );
};
