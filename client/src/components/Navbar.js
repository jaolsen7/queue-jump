import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import { Modal, Button, NavDropdown } from "react-bootstrap"
import { useState } from "react";
import QueueJumpLogo from "./QueueJumpLogo.png";
import userProfile from "./userProfile.jpg"
import Login from "../pages/Login";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar w-100">
  <>
      <img src={QueueJumpLogo} alt={"The logo"} className="col-4" />
    
    <NavDropdown  className="col-2" autoClose="outside" title={<img src={userProfile} alt="Profile Menu" onClick={handleShow} className="m-3 col-12" />}>
        <NavDropdown.Item eventKey="4.1">Home</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Search</NavDropdown.Item>
        <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
        <NavDropdown.Item href="/SignUp">Sign Up</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Favorites</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Reservations</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Log Out</NavDropdown.Item>
      </NavDropdown>
    {/* <Modal show={show} onHide={handleClose}>
      <Modal.Header  className="bg-success bg-opacity-25 bg-gradient" closeButton>
        <Modal.Title>User Options</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-success bg-opacity-75 bg-gradient">
        <NavLink to="/" className="text-decoration-none text-light">
                Home
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink to="/Reservations" className="d-block text-decoration-none text-light my-3">
                    Reservations
                  </NavLink>
                  <button className="d-block text-decoration-none text-light my-3" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="d-block text-decoration-none text-light my-3">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="d-block text-decoration-none text-light my-3">
                    Signup
                  </NavLink>
                </>
              )}
      </Modal.Body>
      <Modal.Footer className="bg-success">
        <Button variant="secondary" onClick={handleClose}>
          Profile
        </Button>
      </Modal.Footer>
    </Modal> */}
  </>
    </nav>
  );
}
