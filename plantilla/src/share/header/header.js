import React, { useState } from "react";
import './header.css'
import logo from '../images/logoZeus.png'
import { NavLink } from 'react-router-dom';
import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { useCart } from "../../hooks/useContext";
import { Navbar } from 'react-bootstrap';

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
                <NavLink to="/">
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
            <nav className={menuOpen ? 'open' : ''}>
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/hombres/paso1" onClick={closeMenu}>Hombres</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="active" to="/mujeres/paso1" onClick={closeMenu}>Mujeres</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="active" to="/contacto" onClick={closeMenu}>Contáctanos</NavLink>
                    </li>
                    <li className="carrito-text">
                        <NavLink exact className="carrito-text" activeClassName="active" to="/carrito" onClick={closeMenu}>{"(" + cartItemCount + ")"} Carrito</NavLink>
                    </li>
                    
                </ul>
            </nav>
            <div className="cart-icon">
                <NavLink to="/carrito">
                    <HiShoppingCart size={35} className="cart-icon" />
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </NavLink>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <HiMenu color="white" size={42} className="menu-icon" />
            </div>
        </header>
    )
}
