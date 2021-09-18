import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Header = ({ onDateSelect, startDate }) => {
  return (
    <header className="Header">
      <h1 className="Header__title">MarsRover</h1>
      <DatePicker
        selected={startDate}
        onChange={onDateSelect}
        className="Header__date-picker"
      />
    </header>
  );
};

export default Header;
