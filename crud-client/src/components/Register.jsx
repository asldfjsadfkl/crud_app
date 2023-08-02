import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = first;
    try {
      const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      };
      await axios.post(
        "http://localhost:4000/user/register",
        { name, email, password },
        config
      );
      navigate("/profile");
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFirst({ ...first, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="form-signin w-50 border border-1 p-4 m-auto mt-5">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              required
              placeholder="UserName"
              name="name"
              value={first.name}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">UserName</label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              required
              placeholder="name@example.com"
              name="email"
              value={first.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              required
              placeholder="Password"
              name="password"
              value={first.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
        </form>
      </main>
    </>
  );
};

export default Register;
