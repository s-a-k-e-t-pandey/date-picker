import React, { useState, useEffect } from "react";
import "./DateRangePicker.css";
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { isSameWeek } from "date-fns";

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface Props {
    onChange?: (range: DateRange) => void;
}

export const DateRangePicker: React.FC<Props> = ({ onChange }) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [{ start: startDate, end: endDate }, setDates] = useState<DateRange>({
        start: null,
        end: null
    });
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (isCalendarVisible && !target.closest('.datepicker')) {
            setIsCalendarVisible(false);
        }
    };

    // Set up click outside listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarVisible]);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [yearRange, setYearRange] = useState({
        start: Math.floor(new Date().getFullYear() / 12) * 12 - 6,
        end: Math.floor(new Date().getFullYear() / 12) * 12 + 6
    });
    const [tempDates, setTempDates] = useState<DateRange>({
        start: null,
        end: null 
    });

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString();
    };

    const handleYearRangeChange = (direction: number) => {
        const change = direction * 12;
        if (
            (direction < 0 && yearRange.start >= 1950) ||
            (direction > 0 && yearRange.end <= 2050)
        ) {
            setYearRange({
                start: yearRange.start + change,
                end: yearRange.end + change
            });
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

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        if (!tempDates.start || (tempDates.start && tempDates.end)) {
            setTempDates({
                start: clickedDate,
                end: null
            });
        } else {
            if (clickedDate < tempDates.start) {
                setTempDates({
                    start: clickedDate,
                    end: tempDates.start
                });
            } else {
                setTempDates({
                    ...tempDates,
                    end: clickedDate
                });
            }
        }
    };


    const handleCancel = () => {
        setTempDates({ start: startDate, end: endDate });
        setIsCalendarVisible(false);
    };

    const handleApply = () => {
        if (tempDates.start && tempDates.end) {
            setDates(tempDates);
            onChange?.(tempDates);
            setIsCalendarVisible(false);
        }
    };

    const navigateMonth = (direction: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction));
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateInRange = (day: number) => {
        if (!tempDates.start) return false;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (!tempDates.end) return date.getTime() === tempDates.start.getTime();
        return date >= tempDates.start && date <= tempDates.end;
    };

    const renderMonthPicker = () => (
        <div className="month-picker">
            <div className="month-grid">
                {monthNames.map((month, index) => (
                    <button
                        key={month}
                        onClick={() => handleMonthClick(index)}
                        className={currentDate.getMonth() === index ? 'selected' : ''}
                    >
                        {month.slice(0, 3)}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderYearPicker = () => (
        <div className="year-picker">
            <div className="year-header">
                <button
                    onClick={() => handleYearRangeChange(-1)}
                    disabled={yearRange.start <= 1900}
                >
                    <ChevronLeft size={20} />
                </button>
                <span>{yearRange.start} - {yearRange.end}</span>
                <button
                    onClick={() => handleYearRangeChange(1)}
                    disabled={yearRange.end >= 3000}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="year-grid">
                {Array.from({ length: 12 }, (_, i) => yearRange.start + i).map(year => (
                    <button
                        key={year}
                        onClick={() => handleYearClick(year)}
                        className={currentDate.getFullYear() === year ? 'selected' : ''}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );

    const selectStartEnd = (date: Date) =>{
        const selectedStart = (tempDates.start && tempDates.end)
        ? (tempDates.start < tempDates.end ? tempDates.start : tempDates.end)
        : tempDates.start || tempDates.end;

        const selectedEnd = (tempDates.start && tempDates.end)
        ? (tempDates.start > tempDates.end ? tempDates.start : tempDates.end)
        : null;
        const isSelectedStart = selectedStart && date.getTime() === selectedStart.getTime();
        const isSelectedEnd = selectedEnd && date.getTime() === selectedEnd.getTime();
        return {isSelectedStart, isSelectedEnd}
    }

    const renderDateButton = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelected = isDateInRange(day);
        const {isSelectedStart, isSelectedEnd} = selectStartEnd(date);
        

        return (
            <button
                key={day}
                className={`date-button 
                    ${isSelected ? 'selected' : ''} 
                    ${isToday ? 'today' : ''}
                    ${isSelectedStart ? 'range-start': ''}
                    ${isSelectedEnd ? 'range-end': ''}
                    `}
                onClick={() => handleDateClick(day)}
            >
            {day}
            </button>
        );
    };

    return (
        <div className="datepicker">
            <div
                className="input-wrapper"
                onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                role="button"
                tabIndex={0}
                aria-expanded={isCalendarVisible}
                aria-haspopup="dialog"
                aria-label="Date range picker"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsCalendarVisible(!isCalendarVisible);
                    } else if (e.key === 'Escape' && isCalendarVisible) {
                        setIsCalendarVisible(false);
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="Select date range"
                    value={startDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ''}
                    readOnly
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCalendarVisible(!isCalendarVisible);
                    }}
                />
                <Calendar className="calendar-icon" size={20} />
            </div>

            {(
                <div className={`calendar ${isCalendarVisible ? 'visible' : ''}`}>
                    <div className="calendar-header">
                        <div className="controls">
                            <button
                                className="prev"
                                onClick={() => navigateMonth(-1)}
                                aria-label="Previous month"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="label">
                                <button
                                    className="month-label"
                                    onClick={() => {
                                        setShowMonthPicker(true);
                                        setShowYearPicker(false);
                                    }}
                                >
                                    {monthNames[currentDate.getMonth()]}
                                </button>
                                <button
                                    className="year-label"
                                    onClick={() => {
                                        setShowYearPicker(true);
                                        setShowMonthPicker(false);
                                    }}
                                >
                                    {currentDate.getFullYear()}
                                </button>
                            </div>
                            <button className="next" onClick={() => navigateMonth(1)}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    {showMonthPicker ? (
                        renderMonthPicker()
                    ) : showYearPicker ? (
                        renderYearPicker()
                    ) : (
                        <>
                            <div className="days">
                                <span>Su</span>
                                <span>Mo</span>
                                <span>Tu</span>
                                <span>We</span>
                                <span>Th</span>
                                <span>Fr</span>
                                <span>Sa</span>
                            </div>
                            <div className="dates">
                                {[...Array(getFirstDayOfMonth(currentDate))].map((_, i) => (
                                    <button key={`empty-${i}`} className="date-button empty" disabled />
                                ))}
                                {[...Array(getDaysInMonth(currentDate))].map((_, i) => renderDateButton(i + 1))}
                            </div>
                        </>
                    )}
                    <div className="actions">
                        <button className="cancel" onClick={handleCancel}>Cancel</button>
                        <button className="apply" onClick={handleApply}>Apply</button>
                    </div>
                    </div>

                </div>
            )}
        </div>
    );
};
