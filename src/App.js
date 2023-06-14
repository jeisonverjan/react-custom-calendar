import { useState } from "react";

export default function App() {
  const [bgColor, setBgColor] = useState("#0049B7");
  const [calendarBgColor, setCalendarBgColor] = useState("#ff1d58");
  const [dayBgColor, setDayBgColor] = useState("#00DDFF");
  const [textBgColor, setTextBgColor] = useState("#3b3737");
  const [sidebarBgColor, setSidebarBgColor] = useState("#f75990");

  return (
    <div
      className="App"
      style={{ backgroundColor: bgColor, color: textBgColor }}
    >
      <ChangeColor
        setBgColor={setBgColor}
        setCalendarBgColor={setCalendarBgColor}
        setDayBgColor={setDayBgColor}
        setTextBgColor={setTextBgColor}
        sidebarBgColor={sidebarBgColor}
        setSidebarBgColor={setSidebarBgColor}
        bgColor={bgColor}
        calendarBgColor={calendarBgColor}
        dayBgColor={dayBgColor}
        textBgColor={textBgColor}
      />
      <Month
        calendarBgColor={calendarBgColor}
        dayBgColor={dayBgColor}
        textBgColor={textBgColor}
      />
    </div>
  );
}

function Month({ calendarBgColor, dayBgColor, textBgColor }) {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const currentDate = new Date(date);

  date.setMonth(month);
  const monthName = date.toLocaleString("default", { month: "long" });

  function handleNextMonth() {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    setMonth(nextMonth);
    setYear(nextYear);
  }

  function handlePrevtMonth() {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;

    setMonth(prevMonth);
    setYear(prevYear);
  }

  return (
    <div
      className="month container"
      style={{ backgroundColor: calendarBgColor }}
    >
      <header className="month-header">
        <h2 className="month-name">{monthName}</h2>
        <h2>{year}</h2>
        <div className="month-btns">
          <ButtonIcon
            onClick={handlePrevtMonth}
            classIcon="left"
            textBgColor={textBgColor}
          />
          <ButtonIcon
            onClick={handleNextMonth}
            classIcon="right"
            textBgColor={textBgColor}
          />
        </div>
      </header>
      <div className="days day-name">
        <span>Dom</span>
        <span>Lun</span>
        <span>Mar</span>
        <span>Mie</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sab</span>
      </div>
      <Days
        date={currentDate}
        month={month}
        year={year}
        dayBgColor={dayBgColor}
      />
    </div>
  );
}

function ButtonIcon({ onClick, classIcon, textBgColor }) {
  return (
    <button className="prev-month" onClick={onClick}>
      <i
        className={`fa-solid fa-chevron-${classIcon}`}
        style={{ color: textBgColor }}
      ></i>
    </button>
  );
}

function Days({ date, month, year, dayBgColor }) {
  const daysInMonth = getDaysInMonth(month, year);
  const newDate = new Date(year, month, 1);
  const firstDayOfWeek = newDate.getDay();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  const days = new Array(daysInMonth + firstDayOfWeek)
    .fill(null)
    .map((_, index) => {
      const dayNumber = index - (firstDayOfWeek - 1);
      return index < firstDayOfWeek ? (
        <div></div>
      ) : (
        <div
          key={index}
          style={{ backgroundColor: dayBgColor }}
          className={`day ${
            dayNumber === currentDay &&
            currentMonth === month &&
            currentYear === year
              ? "current-day"
              : ""
          }`}
        >
          <span>{dayNumber}</span>
        </div>
      );
    });

  return <div className="days">{days}</div>;
}

function ChangeColor({
  setBgColor,
  setCalendarBgColor,
  setDayBgColor,
  setTextBgColor,
  sidebarBgColor,
  setSidebarBgColor,
  bgColor,
  calendarBgColor,
  dayBgColor,
  textBgColor,
}) {
  return (
    <div
      className="palets-color-box container"
      style={{ backgroundColor: sidebarBgColor }}
    >
      <h3 className="sidebar-title">Set Colors</h3>
      <ColorInput text={"Body"} setColor={setBgColor} bgColor={bgColor} />

      <ColorInput
        text={"Calendar"}
        setColor={setCalendarBgColor}
        bgColor={calendarBgColor}
      />

      <ColorInput text={"Day"} setColor={setDayBgColor} bgColor={dayBgColor} />

      <ColorInput
        text={"Text"}
        setColor={setTextBgColor}
        bgColor={textBgColor}
      />

      <ColorInput
        text={"Sidebar"}
        setColor={setSidebarBgColor}
        bgColor={sidebarBgColor}
      />
    </div>
  );
}

function ColorInput({ text, setColor, bgColor }) {
  return (
    <div className="palets-item">
      <label>{text}: </label>
      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
        value={bgColor}
      ></input>
    </div>
  );
}
