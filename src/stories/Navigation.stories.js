import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default {
  title: 'Components/Navigation',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
};

export const MainNavbar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);