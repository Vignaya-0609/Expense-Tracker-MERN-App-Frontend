import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <Navbar className="bg-body-tertiary" fixed='top'>
      <Container fluid>
        <Navbar.Brand href="#home">TrackSpend</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text as={Link} to={"/"} >
            <MdLogout className='fw-bold fs-5 text-dark'/>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar