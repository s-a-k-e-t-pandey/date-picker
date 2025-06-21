export const cssModules = {
  // Button classes
  button: {
    base: 'btn',
    small: 'btn--small',
    medium: 'btn--medium',
    large: 'btn--large',
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    ghost: 'btn--ghost',
    icon: 'btn--icon',
  },
  
  // Input classes
  input: {
    wrapper: 'input-wrapper',
    field: 'input-field',
    icon: 'input-icon',
  },
  
  // Calendar classes
  calendar: {
    container: 'calendar',
    visible: 'calendar--visible',
    header: 'calendar__header',
    nav: 'calendar__nav',
    navButton: 'calendar__nav-button',
    title: 'calendar__title',
    titleButton: 'calendar__title-button',
    weekdays: 'calendar__weekdays',
    weekday: 'calendar__weekday',
    dates: 'calendar__dates',
    actions: 'calendar__actions',
  },
  
  // Date button classes
  dateButton: {
    base: 'date-btn',
    empty: 'date-btn--empty',
    today: 'date-btn--today',
    selected: 'date-btn--selected',
    rangeStart: 'date-btn--range-start',
    rangeEnd: 'date-btn--range-end',
    inRange: 'date-btn--in-range',
    disabled: 'date-btn--disabled',
  },
  
  // Month picker classes
  monthPicker: {
    container: 'month-picker',
    grid: 'month-picker__grid',
    button: 'month-picker__button',
    selected: 'month-picker__button--selected',
  },
  
  // Year picker classes
  yearPicker: {
    container: 'year-picker',
    header: 'year-picker__header',
    range: 'year-picker__range',
    nav: 'year-picker__nav',
    grid: 'year-picker__grid',
    button: 'year-picker__button',
    selected: 'year-picker__button--selected',
  },
  
  // Main component classes
  dateRangePicker: {
    container: 'date-range-picker',
    input: 'date-range-picker__input',
    calendar: 'date-range-picker__calendar',
  },
} as const;
