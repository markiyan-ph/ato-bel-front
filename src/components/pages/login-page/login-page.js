import React from 'react';
import { Button, Form } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {} from 'react';
import './login-page.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // const storageKey = localStorage.getItem('adminToken');
  // const { authorization } = useSelector(state => state);

  // useEffect(() => {
  //   if (storageKey !== authorization.loginScreenCode) {
  //     return navigate('/');
  //   }
  // }, [storageKey]);

  const handleLoginSubmit = e => {
    e.preventDefault();
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <Form className="login-page-form" onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User</Form.Label>
          <Form.Control type="text" placeholder="Enter user" />
          {/* <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
