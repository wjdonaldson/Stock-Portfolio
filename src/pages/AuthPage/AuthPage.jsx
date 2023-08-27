import { useState } from 'react';

import { Button, Col } from 'react-bootstrap';

import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Col md={{span: 8, offset: 2}}>
      <h1>AuthPage</h1>
      <Button variant="info" onClick={() => setShowSignUp(!showSignUp)}> Click for {showSignUp ? 'Log In' : 'Sign Up'}</Button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </Col>
  );
}