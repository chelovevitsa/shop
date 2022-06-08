import React, { useState, useContext } from "react";
import "./Header.scss";
import LoginBox from "../LoginBox/LoginBox";
import AppContext from "./../../appContext/AppContext";
import { useCookies } from "react-cookie";
import AddProduct from "../AddProduct";
import Card from "../Card/Card";

const Header = () => {
  const { logged, setLogged, isAdmin, setIsAdmin } = useContext(AppContext);
  const [loginBoxState, setLoginBoxState] = useState(false);
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["token"]);
  const [showCard, setShowCard] = useState(false);

  const showLoginBox = () => {
    setLoginBoxState(!loginBoxState);
  };

  const logout = () => {
    setLogged(false);
    setIsAdmin(false);
    setCookie("token", "", { path: "/" });
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header--logo">
          <h1>TechniShop</h1>
        </div>
        <div className="header--login">
          {!logged && (
            <button className="header--login__btn" onClick={showLoginBox}>
              Login
            </button>
          )}
          {logged && (
            <button className="header--login__btn" onClick={logout}>
              Wyloguj
            </button>
          )}
        </div>
      </div>
      {isAdmin && (
        <>
          <div className="header--admin">
            <h2>Witaj Admin!</h2>
          </div>
          <AddProduct />
        </>
      )}

      {loginBoxState && !logged && <LoginBox />}

      {/* <Card /> */}
    </div>
  );
};

export default Header;
