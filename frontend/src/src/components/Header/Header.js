import React, { useState } from 'react';
import './Header.scss';
import LoginBox from '../LoginBox/LoginBox';

const Header = () => {
    const [loginBoxState, setLoginBoxState] = useState(false);

    const showLoginBox = () => {
        setLoginBoxState(!loginBoxState);
    };

    return (
        <div className="header-container">
            <div className="header">
                <div className="header--logo">
                    <h1>TechniShop</h1>
                </div>
                <div className="header--login">
                    <button className="header--login__btn"
                            onClick={showLoginBox}>Login</button>
                </div>
            </div>
            {loginBoxState && <LoginBox />}
        </div>
    );
};

export default Header;
