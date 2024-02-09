import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";

const User = () => {

    const {user}= useContext(Context)

  return (
    <>
       <div className="job_post " style={{minHeight:"640px"}}>
      <div className="container" style={{paddingTop:"-50px"}}>
        <h3 style={{marginTop:"-5px"}}>User Profile</h3>
         <div style={{display:"flex",flexDirection:"row" , gap:"50px"}}>
          <div className="wrapper">
            <label>Name:</label>
            <strong> {user?.name} </strong>
          </div>
          <div className="wrapper">
          <label>Email:</label>
            <strong> {user?.email} </strong>
         </div>
         </div>
         <div style={{display:"flex",flexDirection:"row" , gap:"50px"}}>
          <div className="wrapper">
          <label>Role:</label>
            <strong> {user?.role} </strong>
         </div>
          <div className="wrapper">
          <label>Phone:</label>
            <strong> {user?.phone} </strong>
         </div>
         </div>
         <div style={{display:"flex",flexDirection:"row" , gap:"50px"}}>
         <Link to={"/All-Jobs"} >            <button style={{backgroundColor:"#92E3A9", padding:" 15px 15px" , border:"none",borderRadius:"10px", fontWeight:"800"}}> View All Jobs</button></Link>
          <Link to={"/application/me"}>  <button  style={{backgroundColor:"#92E3A9", padding:" 15px 15px" , border:"none",borderRadius:"10px", fontWeight:"800"}}>View Your Application</button> </Link>
         </div>
         </div>
    </div>
   
    </>
  );
};

export default User;
