import React, { useState, useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../App";

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await (await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })).json()

        if (result.accesstoken) {
            setUser({
                accesstoken: result.accesstoken,
            });
            navigate('/');
        } else {
            console.log(result.error);
        }

    };

    
    useEffect(() => {
        console.log(user);
    }, [user])


    const handleChange = e => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
        
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
             <h2>Login</h2>
                <div className="login-input">
                    <input
                        value={email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Enter Email address"
                        autoComplete="email"
                    />
                    <input
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        autoComplete="current-password"
                    />
                    <button type="submit" className="login-input">Login</button>
                </div>
            </form>

        </div>
    )

}


export default Login;