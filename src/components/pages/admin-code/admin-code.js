import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './admin-code.scss';

const AdminCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleCodeSubmit = e => {
    e.preventDefault();
    localStorage.setItem(process.env.REACT_APP_STORAGE_VARIABLE, code);
    navigate('/', { replace: true });
  };

  return (
    <div className="admin-code-page">
      <Form className="admin-code-form" onSubmit={handleCodeSubmit}>
        <Form.Group className="mb-3" controlId="formAdminCode">
          <Form.Label>Admin screen code</Form.Label>
          <Form.Control
            type="input"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter the code"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AdminCodePage;
