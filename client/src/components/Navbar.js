import { Link } from "react-router-dom";
import { useAuth } from "../util/auth";
import { NavDropdown } from "react-bootstrap"
import { useState } from "react";
import QueueJumpLogo from "./QueueJumpLogo.png";
import userProfile from "./userProfile.jpg"

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="navbar w-100">
  <>
      <img src={QueueJumpLogo} alt={"The logo"} className="col-4" />
    
    <NavDropdown  className="col-2" autoClose="outside" title={<img src={userProfile} alt="Profile Menu" onClick={handleShow} className="m-3 col-12" />}>
        <NavDropdown.Item><Link to="/" className="text-dark text-decoration-none">Home</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/search" className="text-dark text-decoration-none">Search</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/login" className="text-dark text-decoration-none">Log in</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/signup" className="text-dark text-decoration-none">Sign Up</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/favorites" className="text-dark text-decoration-none">Favorites</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/reservations" className="text-dark text-decoration-none">Reservations</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        {/* change logout to use isLoggedIn useAuth */}
        <NavDropdown.Item><Link to="/logout" className="text-dark text-decoration-none">Log Out</Link></NavDropdown.Item>
      </NavDropdown>
  </>
    </nav>
  );
}
