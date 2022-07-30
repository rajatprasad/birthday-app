import React, { useState } from "react";
import "./board.css";
import List from "./List";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const Board = ({ data }) => {
  const { width, height } = useWindowSize();
  const [party, setParty] = useState(false);

  function clickHandler() {
    setParty(!party);
  }

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
      {data.length > 0 ? (
        <div className="board">
          {today(data).length > 0 && (
            <>
              <Confetti
                recycle={false}
                numberOfPieces={party ? 200 : 0}
                width={width}
                height={height}
                confettiSource={{
                  w: 10,
                  h: 10,
                  x: width / 2,
                  y: height / 4,
                }}
                onConfettiComplete={(confetti) => {
                  setParty(false);
                  confetti.reset();
                }}
              />
              <h1 className="text-dark title">Happy Birthday 🥳</h1>
              <List clickHandler={clickHandler} data={today(data)} />
            </>
          )}
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
      ) : (
        <div className="noResults">
          <img
            src="https://img.freepik.com/premium-vector/corgi-birthday-cartoon-illustration-animal-party-icon-concept_138676-1895.jpg?w=740"
            alt=""
          />
          <h1 className="title text-dark">No birthdays found for this month</h1>
          {/* <p>or maybe you haven't added anything yet.</p> */}
        </div>
      )}
    </div>
  );
};

export default Board;
