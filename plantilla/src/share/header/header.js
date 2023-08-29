

import React, { useState } from "react";
import './header.css'
import logo from '../images/logo.png'

import { BrowserRouter as Router, Link, Route, Switch, NavLink } from 'react-router-dom';



import { HiMenu, HiShoppingCart } from "react-icons/hi";



import { Navbar, Nav, Container, Row } from 'react-bootstrap';

import { useCart } from "../../hooks/useContext"


export default function Header() {


    const { cartItemCount } = useCart();





    const [menuOpen, setMenuOpen] = useState(false);



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };





    const closeMenu = () => {
        setMenuOpen(false);
    };





    return (

        <header>



            <div className="header-content">



                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>





            </div>





            <nav className={menuOpen ? 'open' : ''}>
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/hombres/paso1" onClick={closeMenu}>Hombres</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="active" to="/mujeres/paso1" onClick={closeMenu}>Mujeres</NavLink>
                    </li>


                    <li className="carrito-text">
                        <NavLink exact className="carrito-text" activeClassName="active" to="/carrito" onClick={closeMenu}>{"("+cartItemCount+")"} Carrito</NavLink>
                    </li>


                </ul>
            </nav>

            <div className="cart-icon">
                <Link to="/carrito">
                    <HiShoppingCart size={35} className="cart-icon" />
                    {cartItemCount > 0 && <span className="cart-count">{ cartItemCount }</span>} {/* Mostrar la cantidad si es mayor a 0 */}
                </Link>
            </div>



            <div className="menu-icon" onClick={toggleMenu}>
                <HiMenu color = "white" size = {42} className="menu-icon" />
            </div>



            {/*<Nav className="me-auto">
                        <Nav.Link href="/hombres/paso1"><p style={{ color: 'black', fontSize: '19.5px', color: 'white', lineHeight: '2.5px' }}>Hombres</p></Nav.Link>
                        <Nav.Link href="/mujeres/paso1"><p style={{ color: 'black', fontSize: '19.5px', color: 'white', lineHeight: '2.5px' }}>Mujeres</p></Nav.Link>
                        <Nav.Link href="/carrito"><p style={{ color: 'black', fontSize: '19.5px', color: 'white', lineHeight: '2.5px' }}>Carrito</p></Nav.Link>
                    </Nav>

    */}








        </header>
    )



}