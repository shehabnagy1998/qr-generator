import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <Link to="/" className="navbar-brand">QR-Gene</Link>
        </nav>
    )
}

export default Navbar
