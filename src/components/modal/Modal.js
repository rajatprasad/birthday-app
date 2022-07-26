// import React, { useState } from "react";
import "../modal/modal.css";
import logo from "../../images/logo.png";

const Modal = ({
  name,
  image,
  bday,
  getBday,
  getImage,
  getName,
  submitHandler,
}) => {
  return (
    <div className="modal">
      <form className="form">
        <div className="form__img">
          <img src={logo} alt="" />
        </div>
        <div className="form__div">
          <label className="form__lable">Name:</label>
          <input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={getName}
          />
          <label className="form__lable">Photo:</label>
          <input
            placeholder="Past the image url "
            type="input"
            value={image}
            onChange={getImage}
          />
          <label className="form__lable">Birth Year:</label>
          <input type="date" value={bday} onChange={getBday} />
          <button
            className="form__button"
            type="submit"
            onClick={submitHandler}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
