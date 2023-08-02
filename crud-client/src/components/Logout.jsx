import React, { Fragment, useEffect, useState } from "react";
import Loader from "./Loader";
import "../css/profile.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState({});
  const [list, setLists] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    try {
      setLoading(true);
      const refreshToken = async () => {
        const { data } = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true,
        });
        setFirst(data?.user);
        setLists(data.listCount);
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
          <div className="main_logout">
            <article className="chide_logout border border-2">
              <section className="section_log">User Data</section>
              <p className="p_logout">{first?.name}</p>
              <p className="p_logout">{first?.email}</p>
              <p className="p_logout">{list} lists</p>

              <button onClick={changPs} className="chang_button">
                Changepassword
              </button>

              <button onClick={Logout} className="logout_button">
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
