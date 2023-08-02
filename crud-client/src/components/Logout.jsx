import React, { Fragment, useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState({});
  const [loading, setLoading] = useState();
  useEffect(() => {
    try {
      setLoading(true);
      const refreshToken = async () => {
        const { data } = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true,
        });
        setFirst(data?.user);
        console.log(data);
        setLoading(false);
      };
      refreshToken();
    } catch (error) {}
  }, []);
  // logout function
  const Logout = async () => {
    await axios.get("http://localhost:4000/user/logout", {
      withCredentials: true,
    });
    navigate("/");
    window.location.reload();
  };

  const changPs = () => {
    navigate("/changepassword");
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="w-100">
            <article className="w-25 border border-2">
              <section className="fs-3">User Data</section>
              <p className="fs-5 mt-4 border border-2 w-100 p-3">
                {first?.name}
              </p>
              <p className="fs-5 mt-4 border border-2 w-100 p-3">
                {first?.email}
              </p>
              <p className="fs-5 mt-4 border border-2 w-100 p-3">
                List Numbers
              </p>

              <button onClick={changPs} className="m-2 fs-8">
                Changepassword{" "}
              </button>

              <button
                onClick={Logout}
                className="w-100 border border-none fs-4"
              >
                Logout
              </button>
            </article>
          </div>
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

export default Logout;
