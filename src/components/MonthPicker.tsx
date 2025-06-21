import "../style/components/month-picker.css";
import { Button } from "./Button";


export const MonthPicker: React.FC<{
  currentDate: Date;
  onMonthClick: (month: number) => void;
}> = ({ currentDate, onMonthClick }) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="month-picker">
      <div className="month-picker__grid">
        {monthNames.map((month, index) => {
          const isSelected = currentDate.getMonth() === index;

          return (
            <Button
                key={month}
                onClick={() => onMonthClick(index)}
                className={`month-picker__button ${isSelected ? 'month-picker__button--selected' : ''}`}
                >
                {month}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
