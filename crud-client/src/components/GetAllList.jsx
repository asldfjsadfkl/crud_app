import React, { Fragment, useEffect, useState } from "react";
import { refreshToken } from "../refreshToken";
import axios from "axios";
import "../css/All.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const GetAllList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function got() {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:4000/getall", {
          withCredentials: true,
        });
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {}
    }
    got();
  }, []);

  const handleDelete = async (id) => {
    refreshToken();
    await axios.delete(`http://localhost:4000/${id}`, {
      withCredentials: true,
    });
    window.location.reload();
  };
  const handleUpdate = async (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <article>
          <header className="headerAll">
            This is header from the list data
          </header>
          <table>
            <tbody>
              <th>
                <td>Name...</td>
                <td>Phone...</td>
                <td>Email...</td>
                <td>Actions</td>
              </th>
              {data &&
                data.lists?.map((resp, index) => {
                  return (
                    <tr key={index}>
                      <td>{resp.name}</td>
                      <td>{resp.phone}</td>
                      <td>{resp.email}</td>

                      <td>
                        <button
                          className="buttonsofac border border-1"
                          onClick={() => handleDelete(resp._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="buttonsofac border border-1"
                          onClick={() => handleUpdate(resp._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </article>
      )}
    </Fragment>
  );
};

export default GetAllList;
