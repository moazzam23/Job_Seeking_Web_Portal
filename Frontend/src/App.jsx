import "./App.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import { Context } from "./main";
import Navbar from "./Components/Layout/Navbar";
import Footor from "./Components/Layout/Footer";
import Jobs from "./Components/Jobs/Jobs";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Myjob from "./Components/Jobs/Myjob";
import CreateJob from "./Components/Jobs/CreateJob";
import JobDetail from "./Components/Jobs/JobDetail";
import Application from "./Components/Applications/Application";
import MyApplication from "./Components/Applications/MyApplication";
import Notfound from "./Components/Not found/Notfound";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import User from "./Components/Layout/User";

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const GetUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    GetUser();
  }, [isAuthorized]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={isAuthorized ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/All-Jobs" element={<Jobs />} />
          <Route path="/job/me" element={<Myjob />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/user/me" element={<User />} />
          <Route path="/application/me" element={<MyApplication />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footor />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
