import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import { Modal, Button } from "react-bootstrap"
import { useState } from "react";
// import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar w-100">
<img src={require('./QueueJumpLogo.png')} alt={"Logo"} className="w-100 d-block"/>



  <>
    <Button variant="primary" onClick={handleShow}>
      Open Menu
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Options</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button> */}
<NavLink to="/" className="navbar-link">
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/protected" className="navbar-link">
            User
          </NavLink>
          <button className="navbar-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>
        </>
      )}
      </Modal.Footer>
    </Modal>
  </>
    </nav>
  );
}
