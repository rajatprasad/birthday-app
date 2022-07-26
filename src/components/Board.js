import React from "react";
import "./board.css";
import List from "./List";

const Board = ({ data }) => {
  function today(person) {
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();

    let filter = person.filter((data) => {
      let day = new Date(data.birthday).getDate();
      let month = new Date(data.birthday).getMonth();

      return currentDay === day && currentMonth === month;
    });

    return filter;
  }

  // UPCOMING BIRTHDAYS

  function upComing(person, toMonth) {
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();

    let filter = person.filter((data) => {
      let day = new Date(data.birthday).getDate();
      let month = new Date(data.birthday).getMonth();

      if (currentDay === day && currentMonth === month) return null;

      if (month === currentMonth && day < currentDay) return null;

      return month >= currentMonth && month <= currentMonth + toMonth;
    });

    return filter;
  }

  // RECENT BIRTHDAYS

  function recent(person, toDay) {
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();

    let filter = person.filter((data) => {
      let day = new Date(data.birthday).getDate();
      let month = new Date(data.birthday).getMonth();

      if (currentDay === day && currentMonth === month) return null;

      if (month === currentMonth && day > currentDay) return null;

      return month <= currentMonth && day + toDay >= currentDay;
    });
    return filter;
  }

  return (
    <div className="main">
      <h1 className="text-dark title">Birthday Reminder</h1>
      <div className="board">
        <List data={today(data)} />
        {recent(data, 5).length > 0 && (
          <>
            <h2 className="heading text-dark">Recent</h2>
            <List data={recent(data, 5)} flag="recent"></List>
          </>
        )}

        {upComing(data, 1).length > 0 && (
          <>
            <h2 className="heading text-dark">Upcoming</h2>
            <List data={upComing(data, 1)} flag="upcoming"></List>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
