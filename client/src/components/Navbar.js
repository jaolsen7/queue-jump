import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import { Modal, Button } from "react-bootstrap"
import { useState } from "react";
import QueueJumpLogo from "./QueueJumpLogo.png";
import userProfile from "./userProfile.jpg"

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar w-100">
  <>
      <img src={QueueJumpLogo} alt={"The logo"} className="col-4" />
    <img src={userProfile} alt={"Profile Menu"} onClick={handleShow} className="m-3 col-2" />

    <Modal show={show} onHide={handleClose}>
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
    </Modal>
  </>
    </nav>
  );
}
