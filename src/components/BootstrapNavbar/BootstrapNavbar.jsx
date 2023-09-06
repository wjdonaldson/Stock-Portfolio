import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { Nav, Navbar } from "react-bootstrap";

export default function BootstrapNavbar({user, setUser}) {

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

  return (
    <Navbar expand="sm" className="bg-body-secondary">
      <Navbar.Brand href="#home" className="ms-5">Stock Portfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {user && user.name ? (
            <>
            <Navbar.Text className="me-3">
              Welcome, {user.name}
            </Navbar.Text>
            <Link className="nav-link me-5" onClick={handleLogOut}>
              Log Out
            </Link>
            </>
        ) : (
          <Link className="nav-link" to="/">
            Sign In
          </Link>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
