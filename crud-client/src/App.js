import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetAllList from "./components/GetAllList";
import Nav from "./components/Nav";
import ListCreate from "./components/ListCreate";
import ListUpdate from "./components/ListUpdate";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import Protected from "./ProtectedRoute/Protected";
import Logout from "./components/Logout";
import Cpassword from "./components/Cpassword";
import Loader from "./components/Loader";

function App() {
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user/me", {
          withCredentials: true,
        });

        setIsAuth(data?.isAuth);;
      } catch (error) {}
    };
    refreshToken();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/changepassword" element={<Cpassword />} />

        <Route
          path="/profile"
          element={
            <Protected isAuthenticated={isAuth}>
              <Logout />
            </Protected>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/load" element={<Loader />} />

        <Route path="/login" element={<Login />} />

        <Route
          exact
          path="/create"
          element={
            <Protected isAuthenticated={isAuth}>
              <ListCreate />
            </Protected>
          }
        />

        <Route path="/update/:id" element={<ListUpdate />} />

        <Route path="/All" element={<GetAllList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
