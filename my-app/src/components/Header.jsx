import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; 

const Header = () => {
  const handleTelegramClick = () => {
    window.location.href = "https://t.me/panchster";
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Pyanuk Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Главная</Nav.Link>
            <Nav.Link href="/card">Продукты</Nav.Link>
            <Nav.Link href="/basket">Корзина</Nav.Link>
            <Nav.Link href="/favorites">Избранное</Nav.Link>
            <Nav.Link href="/about_company">О нас</Nav.Link>
            <Nav.Link as={Link} to="/contactform">Обратная связь</Nav.Link>
            <Nav.Link onClick={handleTelegramClick}><FontAwesomeIcon icon={faTelegram} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
