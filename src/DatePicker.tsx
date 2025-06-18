import {DateRangePicker} from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    return (
        <div className='container'>
            <DateRangePicker
                staticRanges={[]}      
                inputRanges={[]} 
                className='dateRange'
                ranges={[selectedDate]}
                onChange={()=>{}}
            />
        </div>
    );
}