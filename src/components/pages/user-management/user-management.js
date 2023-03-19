import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import Content from '../../content';
import './user-management.scss';

const UserManagementPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });

  const handleUserDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddUserSubmit = e => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <Content classNames={'flex-child'}>
      <div className="user-management-page">
        <div className="user-management-wrapper">
          <Form className="user-management-form" onSubmit={handleAddUserSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                value={userData.username}
                name="username"
                onChange={handleUserDataChange}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="input"
                value={userData.password}
                name="password"
                onChange={handleUserDataChange}
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepeatPassword">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                type="input"
                value={userData.repeatPassword}
                name="repeatPassword"
                onChange={handleUserDataChange}
                placeholder="Enter password again"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th colSpan={2}>User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="user-name-col">Super admin</td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Content>
  );
};

export default UserManagementPage;
