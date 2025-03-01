import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export function Navbar(){
  let data=useCart();
  const[cartView,setCartview]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies('name');
  let navigate=useNavigate();
  function handleLogout(){
    removeCookie('name');
    removeCookie('email');
    navigate("/login");
  }

    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-1">
                <li className="nav-item">
                  <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                </li>
                {
                  (cookies['name'])?
                  <li className="nav-item">
                  <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">My Orders</Link>
                </li>:""
                }
              </ul>
              {(!cookies['name'])?
              <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login ">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createuser ">signup</Link>
              </div>:
              <div>
                <div className="btn bg-white text-success mx-1" onClick={()=>{setCartview(true)}}>
                  My Cart{" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {cartView ?<Modal onClose={()=>setCartview(false)}><Cart></Cart></Modal>:null}
                <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>
                  Logout
                </div>
              </div>
              }
            </div>
          </div>
        </nav>
      </div>
    )
} 