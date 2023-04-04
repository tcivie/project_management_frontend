import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav>
            <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
            <NavLink to="/about" activeClassName="active-link">About</NavLink>
            <NavLink to="/services" activeClassName="active-link">Services</NavLink>
            <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
            <NavLink to="/login" activeClassName="active-link">Login</NavLink>
        </nav>
    );
}

export default NavBar;
