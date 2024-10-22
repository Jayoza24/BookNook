import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="header">
            <div className="logo">
                <h2>Book</h2>
                <h2>Nook</h2>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="link-btn">Home</Link>
                    </li>
                    <li>
                        <Link to="/books" className="link-btn">Books</Link>
                    </li>
                    <li>
                        <Link to="/writes" className="link-btn">Writes</Link>
                    </li>
                    <li>
                        <Link to="/profile" 
                            style={{
                                backgroundColor:"#904E55",
                                padding:"8px 12px",
                                borderRadius:"8px",
                                color:"#F2EFE9",
                                cursor:"pointer"
                                }}
                            className="link-btn">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;