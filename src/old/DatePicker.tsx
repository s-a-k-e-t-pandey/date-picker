
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    const handleSelect = (ranges: any) => {
        setSelectedDate(ranges.selection);
    };

    const [yearRangeStart, setYearRangeStart] = useState(1900);
    
    const customNavigator = (currentDate: Date, changeShownDate: any) => {
        const currentYear = currentDate.getFullYear();
        return (
            <div className="custom-navigator">
                <div className="nav-controls">
                    <button onClick={() => changeShownDate(-1, 'monthOffset')}>
                        <ChevronLeft size={20} />
                    </button>
                    <div className="date-selectors">
                        <button 
                            onClick={() => setShowMonthPicker(!showMonthPicker)}
                            className="month-button"
                        >
                            {monthNames[currentDate.getMonth()]}
                        </button>
                        <button 
                            onClick={() => setShowYearPicker(!showYearPicker)}
                            className="year-button"
                        >
                            {currentDate.getFullYear()}
                        </button>
                    </div>
                    <button onClick={() => changeShownDate(1, 'monthOffset')}>
                        <ChevronRight size={20} />
                    </button>
                </div>

                {showMonthPicker && (
                    <div className="month-year-selector">
                        <div className="selector-grid">
                            {monthNames.map((month, index) => (
                                <button
                                    key={month}
                                    onClick={() => {
                                        const newDate = new Date(currentDate);
                                        newDate.setMonth(index);
                                        changeShownDate(newDate);
                                        setShowMonthPicker(false);
                                    }}
                                    className={`selector-cell ${currentDate.getMonth() === index ? 'selected' : ''} ${new Date().getMonth() === index ? 'current' : ''}`}
                                >
                                    {month.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {showYearPicker && (
                    <div className="month-year-selector">
                        <div className="selector-header">
                            <button onClick={() => setYearRangeStart(prev => Math.max(1950, prev - 12))}>
                                <ChevronLeft size={20} />
                            </button>
                            <span>{yearRangeStart} - {yearRangeStart + 11}</span>
                            <button onClick={() => setYearRangeStart(prev => Math.min(2086, prev + 12))}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="selector-grid">
                            {Array.from({ length: 12 }, (_, i) => yearRangeStart + i).map(year => (
                                <button
                                    key={year}
                                    onClick={() => {
                                        const newDate = new Date(currentDate);
                                        newDate.setFullYear(year);
                                        changeShownDate(newDate);
                                        setShowYearPicker(false);
                                    }}
                                    className={`selector-cell ${currentDate.getFullYear() === year ? 'selected' : ''} ${new Date().getFullYear() === year ? 'current' : ''}`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container">
            <div className="calendar-wrapper">
                <DateRangePicker
                    className="calendar-picker"
                    ranges={[selectedDate]}
                    onChange={handleSelect}
                    months={2}
                    direction="horizontal"
                    staticRanges={[]}
                    inputRanges={[]}
                    monthDisplayFormat="MMMM yyyy"
                    navigatorRenderer={customNavigator}
                    classNames={{
                        calendarWrapper: 'custom-calendar-wrapper',
                        monthAndYearWrapper: 'custom-month-year-wrapper',
                        monthPicker: 'custom-month-picker',
                        yearPicker: 'custom-year-picker',
                        weekDay: 'custom-weekday',
                        day: 'custom-day'
                    }}
                />
            </div>
        </div>
    );
}