import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { Button, Form } from "react-bootstrap";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = (this.state.password !== this.state.confirm) || this.state.password.length === 0;
    return (
      <>
        <Form autoComplete="off" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirm">
            <Form.Label>Confirm</Form.Label>
            <Form.Control
              type="password"
              name="confirm"
              placeholder="Confirm password"
              value={this.state.confirm}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Button className="mt-4" variant="primary" type="submit" disabled={disable}>
            Submit
          </Button>
        </Form>
        <br />
        <p className="error-message">&nbsp;<b>{this.state.error}</b></p>
      </>  
    );
  }
}
