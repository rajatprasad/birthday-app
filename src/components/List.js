import React from "react";
import defaultDp from "../images/default.jpeg";

const List = ({ data, flag }) => {
  function countdown(birthyear) {
    const currentYear = new Date().getFullYear();
    const birthMonth = new Date(birthyear).getMonth() + 1;
    const birthDay = new Date(birthyear).getDate();

    const bday = new Date(`${birthMonth}/${birthDay}/${currentYear}`);

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const today = new Date();
    const gap = bday - today;

    const timeSpan = Math.floor(gap / day) + 1;

    return timeSpan;
  }

  function displayText(timeSpan) {
    if (timeSpan === 0) {
      return `Today`;
    } else if (timeSpan === 1) {
      return `${timeSpan} day to go `;
    } else if (timeSpan > 0) {
      return `${timeSpan} days to go `;
    } else if (timeSpan === -1) {
      return `Yesterday`;
    } else if (timeSpan < 0) {
      return `${Math.abs(timeSpan)} days ago `;
    }
  }

  let bgColor;

  if (flag === "recent") {
    bgColor = { backgroundColor: "#ff766d" };
  } else if (flag === "upcoming") {
    bgColor = { backgroundColor: "#ffe66d" };
  } else {
    bgColor = {};
  }

  // let bgColor = upcoming ? { backgroundColor: "#ffe66d" } : {};

  return (
    <div className="list">
      {data.map((person, index) => {
        return (
          <p key={index}>
            <div className="flex" style={bgColor}>
              <img src={person.img || defaultDp} alt="" />
              <div className="title">
                <h3 className="name">{person.name}</h3>
                <h5 className="age">
                  {displayText(countdown(person.birthday))}
                </h5>
              </div>
            </div>
          </p>
        );
      })}
    </div>
  );
};

export default List;
