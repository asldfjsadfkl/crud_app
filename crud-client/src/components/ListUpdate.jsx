import React, { useState, useEffect, Fragment } from "react";
import { refreshToken } from "../refreshToken";
import axios from "axios";
import "../css/create.css";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
const ListUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [first, setfirst] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function got() {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:4000/${id}`, {
          withCredentials: true,
        });
        console.log(data.list1);
        setfirst(data.list1);
        setLoading(false);
      } catch (error) {}
    }
    got();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setfirst({ ...first, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    refreshToken();
    const myData = new FormData();
    myData.set("name", first.name);
    myData.set("phone", first.phone);
    myData.set("email", first.email);
    const config = {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    };
    await axios.put(`http://localhost:4000/${id}`, myData, config);
    navigate("/All");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form className="formcreate" method="POST" onSubmit={handleSubmit}>
            <section>Update List</section>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={first.name}
              onChange={handleChange}
              required
              className="inputs"
            />
            <input
              type="Number"
              name="phone"
              placeholder="Phone..."
              value={first.phone}
              onChange={handleChange}
              required
              className="inputs"
            />
            <input
              type="email"
              name="email"
              placeholder="Email..."
              value={first.email}
              onChange={handleChange}
              required
              className="inputs"
            />
            <button type="submit" className="createButton">
              Update
            </button>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListUpdate;
