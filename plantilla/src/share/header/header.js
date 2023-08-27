

import React from "react";
import './header.css'
import logo from '../images/logo.png'



import { Navbar, Nav, Container, Row } from 'react-bootstrap';


export default function Header() {

    return (

        <div>



            <Navbar className="navbar" style={{ backgroundColor: '#F53C30', paddingLeft: '2px' }}>
                <Container  disableGutters className = 'px-2' style = {{ paddingLeft: '2px !important', position: 'relative'}}>
                    <Navbar.Brand href="/">
                        <img width={97.5} src={logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle />



                    <Nav className="me-auto">
                        <Nav.Link href="/hombres/paso1"><p style = {{ color: 'black', fontSize: '19.5px', color: 'white', lineHeight: '2.5px'}}>Hombres</p></Nav.Link>
                        <Nav.Link href="/mujeres/paso1"><p style = {{ color: 'black', fontSize: '19.5px', color: 'white', lineHeight: '2.5px'}}>Mujeres</p></Nav.Link>
                    </Nav>





                </Container>
            </Navbar>



        </div>
    )



}