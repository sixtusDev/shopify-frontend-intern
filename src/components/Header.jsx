import { forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";

import "./Header.scss";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ onDateSelect, startDate }) => {
  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <button className="Header__date" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const CustomCalenderContainer = ({ className, children }) => {
    return (
      <div className="calender-container">
        <CalendarContainer className={className}>
          <div>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  return (
    <header className="Header">
      <h1 className="Header__title">
        <span className="Header__title--sub">Mars</span>Rover
      </h1>
      <div>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={startDate}
          onChange={onDateSelect}
          customInput={<CustomDatePickerInput />}
          calendarContainer={CustomCalenderContainer}
        />
      </div>
    </header>
  );
};

export default Header;
