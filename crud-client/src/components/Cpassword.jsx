import React, { useState } from "react";
import axios from "axios";

const Cpassword = () => {
  const [first, setFirst] = useState({
    oldPass: "",
    newPass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPass, newPass } = first;
    try {
      const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      };
      await axios.put(
        "http://localhost:4000/user/changepassword",
        { oldPass, newPass },
        config
      );
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFirst({ ...first, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="form-signin w-50 p-5 mt-5 border border-2 m-auto">
        <form onSubmit={handleSubmit} method="PUT">
          <h1 className="h3 mb-3 fw-normal">Change Password</h1>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              required
              placeholder="name@example.com"
              name="oldPass"
              value={first.oldPass}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Old Password</label>
          </div>
          <div className="form-floating mt-4 mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              required
              placeholder="Password"
              name="newPass"
              value={first.newPass}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">New Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Save
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
        </form>
      </main>
    </>
  );
};

export default Cpassword;
