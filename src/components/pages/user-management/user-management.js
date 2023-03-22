import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Content from '../../content';
import './user-management.scss';
import ConfirmationForm from '../../modal-forms/confirmation-form';
import * as actions from '../../../store/actions';

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [showDeleteConfirmation, popupDeleteConfirmation] = useState(false);
  const [deleteData, setDeleteData] = useState({
    userId: '',
    userName: '',
  });
  const { usersList } = useSelector(state => state.authorization);
  const [checkValidation, setCheckValidation] = useState(false);

  const addNewUser = newUserData => dispatch(actions.addUser(newUserData));
  const fetchUsersList = () => dispatch(actions.fetchUsers());
  const openConfirmation = () => popupDeleteConfirmation(true);
  const closeConfirmation = () => popupDeleteConfirmation(false);

  useEffect(() => {
    if (usersList.length === 0) {
      fetchUsersList();
    }
  }, []);
  
  const handleUserDataChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddUserSubmit = e => {
    e.preventDefault();
  
    if (userData.password !== userData.repeatPassword) {
      return setCheckValidation(true);
    }

    addNewUser({ username: userData.username, email: userData.email, password: userData.password });
  };

  const handleDeleteUser = (userId, userName) => {
    setDeleteData({
      userId,
      userName,
    });
    openConfirmation();
  };

  const deleteUser = userId => {
    console.log(`User with id: ${userId} deleted`);
  };

  const users = usersList.map((user, i) => (
    <tr key={user.id}>
      <td>{i + 1}</td>
      <td className="user-name-col">{user.username}</td>
      <td className="user-email-col">{user.email}</td>
      <td>
        <Button variant="danger" onClick={() => handleDeleteUser(user.id, user.username)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Content classNames={'flex-child'}>
      <div className="user-management-page">
        <div className="user-management-wrapper">
          <Form className="user-management-form" onSubmit={handleAddUserSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="input"
                value={userData.username}
                name="username"
                onChange={handleUserDataChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="input"
                value={userData.email}
                name="email"
                onChange={handleUserDataChange}
                placeholder="Enter user email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                value={userData.password}
                name="password"
                onChange={handleUserDataChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepeatPassword">
              <Form.Label>Repeat password *</Form.Label>
              <Form.Control
                type="password"
                value={userData.repeatPassword}
                name="repeatPassword"
                onChange={handleUserDataChange}
                placeholder="Enter password again"
                isInvalid={checkValidation ? userData.password !== userData.repeatPassword : false}
                required
              />
              <Form.Control.Feedback type="invalid">Entered different passwords</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{users}</tbody>
          </Table>
        </div>
        <ConfirmationForm
          show={showDeleteConfirmation}
          close={closeConfirmation}
          title="Delete user"
          bodyText={`Are you sure you want delete user ${deleteData.userName}?`}
          confirmAction={deleteUser}
          actionParams={[deleteData.userId]}
        />
      </div>
    </Content>
  );
};

export default UserManagementPage;
