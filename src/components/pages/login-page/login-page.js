import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Message } from '../../message';
import * as actions from '../../../store/actions';
import './login-page.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginForm, setLoginForm] = useState({
    userName: '',
    userPassword: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [tick, setTick] = useState(null);
  const authorizationState = useSelector(state => state.authorization);
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (authorizationState.isAuthorized) {
      return navigate(from, { replace: true });
    }

    if (authorizationState.failMessage !== null) {
      clearTimeout(tick);
      setShowMessage(true);
      setTick(
        setTimeout(() => {
          setShowMessage(false);
        }, 3500)
      );
    }
  }, [authorizationState.isAuthorized, authorizationState.failMessage]);

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    dispatch(actions.authorizeUser(loginForm.userName, loginForm.userPassword));
    // navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <Form className="login-page-form" onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            value={loginForm.userName}
            name="userName"
            onChange={handleInputChange}
            placeholder="Username"
          />
          {/* <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={loginForm.userPassword}
            name="userPassword"
            onChange={handleInputChange}
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Message showMessage={showMessage} cleanupAction={actions.authorizeRemoveErrorMessage} variant="danger">
        {authorizationState.failMessage}
      </Message>
    </div>
  );
};

export default LoginPage;
