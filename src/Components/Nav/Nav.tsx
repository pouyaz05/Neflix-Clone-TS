import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../Assets/Netflix_2015_logo.svg'; 
import './Nav.css';
import {jwtDecode} from 'jwt-decode'; // برای دیکد کردن توکن JWT

interface User {
  username: string;
  email: string;
}

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
  iat: number;
  // سایر فیلدهای توکن
}

const Nav: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    // دیکد کردن توکن با کتابخانه jwt-decode
                    const decoded: DecodedToken = jwtDecode(token);
                    console.log(decoded);
                    
                    // بررسی انقضای توکن
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        // توکن منقضی شده
                        Cookies.remove('token');
                        setUser(null);
                        return;
                    }

                    setUser({ 
                        username: decoded.name, 
                        email: decoded.email 
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setUser(null);
                Cookies.remove('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    console.log(user);
    
    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    if (loading) {
        return (
            <nav className={`nav mb-5 ${show ? "navblack" : ""}`}>
                <div className='pb-5'>
                    <img className='navlogo' src={logo} alt="Netflix Logo" />
                </div>
                <div>Loading...</div>
            </nav>
        );
    }

    return (
        <nav className={`nav mb-5 ${show ? "navblack" : ""}`}>
            <div className='pb-5'>
                <img 
                    className='navlogo' 
                    src={logo} 
                    alt="Netflix Logo" 
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div>
                {user ? (
                    <div className="dropdown">
                        <button className='btn mt-1 dropdown-toggle' onClick={handleProfileClick}>
                            {user.username}
                        </button>
                        {/* <div className="dropdown-content">
                            <span>{user.email}</span>
                            <button 
                                className="dropdown-item" 
                                onClick={() => {
                                    Cookies.remove('token');
                                    setUser(null);
                                    navigate('/');
                                }}
                            >
                                Sign Out
                            </button>
                        </div> */}
                    </div>
                ) : (
                    <button className='btn mt-1' onClick={handleSignIn}>
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};
 
export default Nav;