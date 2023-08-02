import React, { useState } from "react";
import { refreshToken } from "../refreshToken";
import axios from "axios";
import "../css/create.css";
import { useNavigate } from "react-router-dom";

const ListCreate = () => {
  const [first, setfirst] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setfirst({ ...first, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(first);
    const myData = new FormData();
    myData.set("name", first.name);
    myData.set("phone", first.phone);
    myData.set("email", first.email);
    const config = {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    };
    await axios.post("http://localhost:4000/create", myData, config);
    navigate("/All");
  };

  return (
    <>
      <form className="formcreate" method="POST" onSubmit={handleSubmit}>
        <section>Create New List</section>
        <input
          maxLength="20"
          type="text"
          name="name"
          placeholder="Name..."
          value={first.name}
          onChange={handleChange}
          required
          className="inputs"
        />
        <input
          maxLength="20"
          type="Number"
          name="phone"
          placeholder="Phone..."
          value={first.phone}
          onChange={handleChange}
          required
          className="inputs"
        />
        <input
          maxLength="20"
          type="email"
          name="email"
          placeholder="Email..."
          value={first.email}
          onChange={handleChange}
          required
          className="inputs"
        />
        <button className="createButton" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default ListCreate;
