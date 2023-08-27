import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

import { Container, Row } from "react-bootstrap";

import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import BootstrapNavbar from "../../components/BootstrapNavbar/BootstrapNavbar";
import MainPage from "../MainPage/MainPage";
import StockSearchPage from "../StockSearchPage/StockSearchPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <BootstrapNavbar user={user} setUser={setUser}/>
      <Container>
        <Row>
          {user ? (
            <>
              <Routes>
                {/* Route components in here */}
                <Route path="/" element={<MainPage />} />
                <Route path="/search" element={<StockSearchPage />} />
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
