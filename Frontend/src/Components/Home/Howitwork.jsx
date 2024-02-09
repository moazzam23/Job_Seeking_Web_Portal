import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from "react-icons/io";

const Howitwork = () => {
  return (
    <div className="howitworks">
    <div className="container">
      <h3>How Job-Seeker Works</h3>
      <div className="banner">
        <div className="card">
          <FaUserPlus />
          <p>Create Account</p>
          <p>
            Login or Register to Avail you Dream job and Salary
          </p>
        </div>
        <div className="card">
          <MdFindInPage />
          <p>Find a Job/Post a Job</p>
          <p>
            It's Depend On roles,<br/><br/>
            <strong>1.</strong>  User Can Find and Apply For Job.<br/>
            <strong>2.</strong>  Employee Can Post the New Job <br/>
          </p>
        </div>
        <div className="card">
          <IoMdSend />
          <p>Apply For Job/Recruit Suitable Candidates</p>
          <p>
          It's Depend On roles,<br/><br/>
        <strong>1.</strong>     User Can Find and Apply For Job.<br/>
        <strong>2.</strong>  Employee Can Select the Suitable Canditate Which Fit For The Selected Role 
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Howitwork