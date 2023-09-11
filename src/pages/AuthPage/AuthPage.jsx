import { useState } from 'react';

import { Button, Col, Row } from 'react-bootstrap';

import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
    <Row>
    <Col md={{span: 3, offset: 5}}>
        {showSignUp ? (<h1 className="mt-4">Sign Up Page</h1>) : (<h1 className="mt-4">Login Page</h1>)}
    </Col>
    </Row>
    <Row>
    <Col md={{span: 6, offset: 3}}  className="AuthPage" style={{"height": 500}}>
      <div className="me-auto">
        <Button className="py-3" variant="info" onClick={() => setShowSignUp(!showSignUp)}> 
          Click for {showSignUp ? 'Log In' : 'Sign Up'}
        </Button>
      </div>
      <div className="ms-auto">
        { showSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )
        }
      </div>
    </Col>
    </Row>
    </>
  );
}