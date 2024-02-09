import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import img2 from "../../Asset/Screenshot__108_-removebg-preview.png"
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const logouthandle = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.res.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src={img2} alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              {" "}
              <Link to={"/"} onClick={() => setShow(false)}>
                {" "}
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/All-Jobs"} onClick={() => setShow(false)}>
                {" "}
                All Jobs
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/application/me"} onClick={() => setShow(false)}>
                {user && user.role === "employee"
                  ? "Applicant's Application"
                  : " My Application"}
              </Link>
            </li>
            <li>
                  <Link to={"/user/me"} onClick={() => setShow(false)}>
                   <FaUserCircle style={{height:"2.5rem",width:"2.5rem"}}/>
                  </Link>
                </li>
            {user && user.role === "employee" ? (
              <>
                <li>
                  {" "}
                  <Link to={"/create-job"} onClick={() => setShow(false)}>
                    {" "}
                    Post New Job
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    My Jobs
                  </Link>
                </li>
                
              </>
            ) : (
              <></>
            )}
            <button onClick={logouthandle}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
