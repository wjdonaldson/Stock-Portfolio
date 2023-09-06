import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { Container, Row } from "react-bootstrap";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import BootstrapNavbar from "../../components/BootstrapNavbar/BootstrapNavbar";
import MainPage from "../MainPage/MainPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <BootstrapNavbar user={user} setUser={setUser}/>
      <Container className="theApp ">
        <Row>
          {user ? (
            <>
              <Routes>
                <Route path="/" element={<MainPage />} />
              </Routes>
            </>
          ) : (
            <AuthPage setUser={setUser} />
          )}
        </Row>
      </Container>
    </>
  );
}
