import React, { useEffect, useState } from 'react';
import logo from '../Assets/Netflix_2015_logo.svg'; // Proper image import
import './Nav.css';

const Nav: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);   
     
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`nav mb-5 ${show ? "navblack" : ""}`}>
            <div className='pb-5'>
                <img 
                    className='navlogo' 
                    src={logo} 
                    alt="Netflix Logo" 
                />
            </div>
            <div>
                <button className='btn mt-1'>Sign In</button>
            </div>
        </nav>
    );
};

export default Nav;