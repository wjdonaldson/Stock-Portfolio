import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function BootstrapNavbar({user, setUser}) {

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Navbar.Brand href="#home" className="ms-2">Stock Portfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && user.name ? (
            <>
              <Link className="nav-link" to="/">
                Main
              </Link>
              <Link className="nav-link" onClick={handleLogOut}>
                Log Out
              </Link>
            </>
          ) : (
            <Link className="nav-link" to="/">
              Sign In
            </Link>
          )}
        </Nav>
        <Nav className="ms-auto">
          {user && user.name ? (
            <Navbar.Text className="me-3">
            Welcome, {user.name}
          </Navbar.Text>
          ) : ("")}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
