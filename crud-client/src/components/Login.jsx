import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = first;
    try {
      const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      };
      await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        config
      );
      navigate("/");
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFirst({ ...first, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="form-signin w-50 p-5 mt-5 border border-2 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
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
          <div className="form-floating mt-4">
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

export default Login;
