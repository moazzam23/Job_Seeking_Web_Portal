import React from "react";
import { Link } from "react-router-dom";
import {FaBackward} from "react-icons/fa"
import {MdError} from "react-icons/md"

const Notfound = () => {
  return (
    <>
      <section className="page notfound">
        <div className="content">
<MdError style={{height:"3rem",width:"3rem"}}/>
          <h1 style={{paddingBottom:"50px"}}>Page Not Found</h1>
          <Link to={"/"}><FaBackward style={{paddingRight:"10px",height:"1.5rem",width:"1.5rem"}}/>RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  );
};

export default Notfound;
