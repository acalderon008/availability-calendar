// US National Holidays utility

// List of US federal holidays
const FEDERAL_HOLIDAYS = [
  { name: "New Year's Day", month: 0, day: 1, fixed: true },
  { name: "Martin Luther King Jr. Day", month: 0, day: 15, fixed: false, week: 3, weekday: 1 }, // Third Monday in January
  { name: "Presidents' Day", month: 1, day: 15, fixed: false, week: 3, weekday: 1 }, // Third Monday in February
  { name: "Memorial Day", month: 4, day: 25, fixed: false, week: 4, weekday: 1 }, // Last Monday in May
  { name: "Independence Day", month: 6, day: 4, fixed: true },
  { name: "Labor Day", month: 8, day: 1, fixed: false, week: 1, weekday: 1 }, // First Monday in September
  { name: "Columbus Day", month: 9, day: 8, fixed: false, week: 2, weekday: 1 }, // Second Monday in October
  { name: "Veterans Day", month: 10, day: 11, fixed: true },
  { name: "Thanksgiving Day", month: 10, day: 22, fixed: false, week: 4, weekday: 4 }, // Fourth Thursday in November
  { name: "Christmas Day", month: 11, day: 25, fixed: true }
];

// Get the nth occurrence of a weekday in a month
const getNthWeekday = (year, month, week, weekday) => {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (week - 1) * 7;
  return new Date(year, month, day);
};

// Get the last occurrence of a weekday in a month
const getLastWeekday = (year, month, weekday) => {
  const lastDay = new Date(year, month + 1, 0);
  const lastWeekday = lastDay.getDay();
  const offset = (lastWeekday - weekday + 7) % 7;
  const day = lastDay.getDate() - offset;
  return new Date(year, month, day);
};

// Get all holidays for a specific year
export const getHolidaysForYear = (year) => {
  const holidays = [];
  
  FEDERAL_HOLIDAYS.forEach(holiday => {
    let date;
    
    if (holiday.fixed) {
      date = new Date(year, holiday.month, holiday.day);
    } else {
      if (holiday.name === "Memorial Day") {
        // Memorial Day is the last Monday in May
        date = getLastWeekday(year, holiday.month, holiday.weekday);
      } else {
        // Other floating holidays
        date = getNthWeekday(year, holiday.month, holiday.week, holiday.weekday);
      }
    }
    
    holidays.push({
      name: holiday.name,
      date: date,
      dateString: date.toISOString().split('T')[0]
    });
  });
  
  return holidays;
};

// Check if a date is a holiday
export const isHoliday = (date, year) => {
  const holidays = getHolidaysForYear(year);
  const dateString = date.toISOString().split('T')[0];
  return holidays.find(holiday => holiday.dateString === dateString);
};

// Get holiday name for a date
export const getHolidayName = (date, year) => {
  const holiday = isHoliday(date, year);
  return holiday ? holiday.name : null;
};

// Get all holidays for display
export const getAllHolidays = () => {
  const currentYear = new Date().getFullYear();
  return getHolidaysForYear(currentYear);
}; 