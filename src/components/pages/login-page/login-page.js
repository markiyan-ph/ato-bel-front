import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
  const from = location.state?.from?.pathname || '/';
  // const storageKey = localStorage.getItem('adminToken');
  // const { authorization } = useSelector(state => state);

  // useEffect(() => {
  //   if (storageKey !== authorization.loginScreenCode) {
  //     return navigate('/');
  //   }
  // }, [storageKey]);

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    dispatch(actions.authorizeUser(loginForm.userName, loginForm.userPassword));
    navigate(from, { replace: true });
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
      <Message showMessage={false} variant='danger'>Test new message Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae nemo suscipit voluptate non delectus architecto quia temporibus eveniet! Modi atque autem asperiores soluta rerum vero ipsa dicta temporibus saepe.</Message>
    </div>
  );
};

export default LoginPage;
