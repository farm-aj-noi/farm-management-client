import React, { useContext, useState, useRef, useEffect } from "react";

import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from './datepicker.module.css'

const HomePage = () => {
  const dateRef = useRef();
  const [date, setDate] = useState(new Date());
  const [selectedDate, handleDateChange] = useState(
    dayjs(date).format("YYYY-MM-DD")
  );
  // console.log(selectedDate);
  const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

  const dateValueRef = useRef(date);
  dateValueRef.current = date;

  const changeDateToBuddhist = (changeDate = new Date()) => {
    const prevDate = new Date(changeDate);
    // console.log("current date", prevDate === date);
    const newDate = new Date(
      prevDate.setFullYear(prevDate.getFullYear() + 543)
    );
    // console.log("year", newDate.getFullYear());
    dateRef.current.input.value = `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
  };

  // component did mount
  useEffect(() => {
    // console.log("dateRef", dateRef);
    // change date value in input dom on mounted
    changeDateToBuddhist(date);
    const datePicker = dateRef.current;
    const renderDateInput = datePicker.renderDateInput;
    // console.log(renderDateInput);
    datePicker.renderDateInput = function () {
      const inputDom = renderDateInput();
      return React.cloneElement(inputDom, {
        value: changeDateToBuddhist(dateValueRef.current),
      });
    };
  }, []);

  const onChangeDatePicker = (e) => {
    // console.log("onChange");
    setDate(e);
    handleDateChange(dayjs(date).format("YYYY-MM-DD"));
  };
  return (
      <div className={Datestyle.customDatePickerWidth}>
        <DatePicker
        className={Datestyle.datepicker}
        selected={date}
        onChange={onChangeDatePicker}
        dateFormat="dd/mm/yyyy"
        ref={dateRef}
        locale="th"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      </div>
  );
};

export default HomePage;
