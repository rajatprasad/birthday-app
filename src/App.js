import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Modal from "./components/modal/Modal";
import Navbar from "./components/navbar/Navbar";
import Peoples from "./components/peoples/Peoples";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [bday, setBday] = useState();
  const [image, setImage] = useState("");

  let navigate = useNavigate();

  // form start

  function getName(e) {
    setName(e.target.value);
  }

  function getBday(e) {
    setBday(e.target.value);
  }

  function getImage(e) {
    // const [file] = e.target.files;
    // setImage(URL.createObjectURL(file));
    // setImage(e.target.files[0]);
    // console.log(e.target.files);
    setImage(e.target.value);
  }

  function old(personAge) {
    let year = new Date(personAge).getFullYear();
    let currentYear = new Date().getFullYear();

    let age = currentYear - year;
    return age;
  }

  function submitHandler(e) {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100);
    const age = old(bday);
    renderData(id, name, image, age, bday);
    setName("");
    setBday();
    setImage("");
    navigate("/");
  }

  // form end

  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) setData(data);
  }, []);

  function renderData(id, name, image, age, bday) {
    setData([
      ...data,
      { id: id, name: name, img: image, birthday: bday, age: age },
    ]);
  }

  function deleteData(id) {
    const filter = data.filter((items) => items.id !== id);
    setData(filter);
  }

  function updateData(id) {
    const filter = data.filter((items) => items.id === id)[0];
    setName(filter.name);
    setImage(filter.img);
    setBday(filter.birthday);
    deleteData(id);
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Board data={data} />} />
        <Route
          path="/add"
          element={
            <Modal
              renderData={renderData}
              name={name}
              image={image}
              bday={bday}
              getName={getName}
              getImage={getImage}
              getBday={getBday}
              submitHandler={submitHandler}
            />
          }
        />
        <Route
          path="/view"
          element={
            <Peoples
              data={data}
              deleteData={deleteData}
              updateData={updateData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
