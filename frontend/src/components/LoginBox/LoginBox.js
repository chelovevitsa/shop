import React, { useContext, useState } from 'react';
import './LoginBox.scss';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { LoginBoxSerivce } from './LoginBox.service';
import { useCookies } from 'react-cookie';
import AppContext from './../../appContext/AppContext';

const LoginBox = () => {
    const { setLogged, setIsAdmin } = useContext(AppContext);
    const [newAccount, setNewAccount] = useState(false);
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['token']);

    const loginRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const newAccountClick = () => {
        setNewAccount(!newAccount);
    };

    const submit = async (e) => {
        e.preventDefault();

        const login = loginRef.current.value;
        const email = emailRef.current ? emailRef.current.value : '';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailPattern.test(email);
        const password = passwordRef.current.value;

        const data = { login, email, password };

        if (!data.login || !data.password || (newAccount && (!data.email || !isEmailValid))) {
            NotificationManager.error('Please write correct data', 'ERROR', 3000);

            return;
        }

        const res = await LoginBoxSerivce.login(data);

        if (!res.data.success) {
            NotificationManager.error(res.data.message, 'ERROR', 3000);
            return;
        }

        setCookie('token', res.data.token, { path: '/' });
        setIsAdmin(res.data.admin);

        setLogged(true);
    };

    return (
        <div className="login-box-container">
            <div className="login-box">
                <h2>Login Box</h2>
                <form className="form">
                    <label htmlFor="login"
                           className="form__label">Login</label>
                    <input id="login"
                           ref={loginRef}
                           type="text"
                           className="form__input"
                    />

                    {newAccount && 
                        <>
                            <label htmlFor="email"
                                className="form__label">Email</label>
                            <input id="email"
                                   ref={emailRef}
                                   type="text"
                                   className="form__input"
                            />
                        </>
                    }

                    <label htmlFor="password"
                           className="form__label">Password</label>
                    <input id="password"
                           ref={passwordRef}
                           type="password"
                           className="form__input"
                    />

                    <button className="form__submit"
                            onClick={(e) => submit(e)}>Login</button>
                    
                    <div onClick={newAccountClick}>
                        <input onChange={()=>{}}
                               type="checkbox"
                               checked={newAccount}
                        />Register account
                    </div>
                </form>
            </div>
            <NotificationContainer/>
        </div>
    );
};

export default LoginBox;
