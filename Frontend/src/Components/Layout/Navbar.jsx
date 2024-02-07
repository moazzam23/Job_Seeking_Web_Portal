import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import img from "../../assets/JobZeelogoswhite.png"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const[show,setShow]=useState(false)

  const {isAuthorized,setIsAuthorized,user}= useContext(Context)
const navigate = useNavigate()

  const logouthandle= async()=>{
    try {    
      const res = axios.get("http://localhost:4000/api/v1/user/logout",{withCredentials:true});
      setIsAuthorized(false)
toast.success(res.data.message)
navigate("/login")
    } catch (error) {
      toast.error(error.res.data.message)
      setIsAuthorized(true)
    }
  }


  return (
    <>
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
<div className="container">
  <div className="logo">
    <img src={img} alt="logo" />
  </div>
  <ul className={!show ? "menu" : "show-menu menu"}>
<li> <Link to={"/"} onClick={()=>setShow(false)} > Home</Link></li>
<li> <Link to={"/All-Jobs"} onClick={()=>setShow(false)} > All Jobs</Link></li>
<li> <Link to={"/"} onClick={()=>setShow(false)} > Home</Link></li>
  </ul>
</div>

    </nav>
    </>
  )
}

export default Navbar