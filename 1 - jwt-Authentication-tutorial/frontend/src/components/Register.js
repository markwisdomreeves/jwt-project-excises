import React, { useState } from "react";
import { navigate } from "@reach/router";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await (await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })).json()


        // If there is no error, we will console.log and navigate to the home page
        if (!result.error) {
            console.log(result.message);
            navigate('/');
        } else {
            console.log(result.error);
        }

    };


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
             <h2>Register</h2>
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

                   <div className="submit-container">
                    <button type="submit" className="login-input">Register</button>
                   </div>
                </div>
            </form>

        </div>
    )

}


export default Register;