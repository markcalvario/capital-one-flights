import React from 'react';
import Navbar from "react-bootstrap/Navbar";

function Header(props) { 
    return (
        <Navbar variant="dark" className="px-5 py-3 bg-black ">
            <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        </Navbar>
    )
}

export default Header;