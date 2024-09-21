import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastMessage from './ToastMessage';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(""); 
    const [toastClr, setToastClr] = useState("");

    // Username Validation
    const usernameCheck = () => {
        let nameRegex = /^[a-zA-Z\s_]*$/;
        if (!username.trim() || !nameRegex.test(username.trim())) {
            setUsernameError('Valid Username is required');
            return false;
        } else {
            setUsernameError('');
            return true;
        }
    };

    // Email Validation
    const userEmailCheck = () => {
        const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}$/;
        const emailRegex2 = /^[a-zA-Z0-9]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]+[.]+[a-z]{2,3}$/;
        if (email.trim().match(emailRegex) || email.trim().match(emailRegex2)) {
            setEmailError('');
            return true;
        } else {
            setEmailError('Valid Email is required');
            return false;
        }
    };

    // Password Validation
    const userPasswordCheck = () => {
        if (!password.trim()) {
            setPasswordError('Password is required');
            return false;
        } else if (password.trim().length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const signup = async (e) => {
        e.preventDefault();

        // Validate fields
        const isUsernameValid = usernameCheck();
        const isEmailValid = userEmailCheck();
        const isPasswordValid = userPasswordCheck();

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            try {
                const response = await fetch(`http://localhost:5000/transactionApi/createuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                if (response.ok) {
                    setToastMessage("Successfully Registered!");
                    setToastClr("success");
                    setShowToast(false); 
                    setTimeout(() => setShowToast(true), 100);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                } else {
                    setToastMessage("Signup failed! Please try again with a different email.");
                    setToastClr("danger");
                    setShowToast(false);
                    setTimeout(() => setShowToast(true), 100);
                }
            } catch (error) {
                setToastMessage("An unexpected error occurred. Please try again.");
                setToastClr("danger");
                setShowToast(false);
                setTimeout(() => setShowToast(true), 100);
            }
        }
    };

    return (
        <>
            <Form onSubmit={signup}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username <span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyUp={usernameCheck} />
                    {usernameError && <p className="text-danger" style={{ fontSize: "10px" }}>{usernameError}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address <span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={userEmailCheck} />
                    {emailError && <p className="text-danger" style={{ fontSize: "10px" }}>{emailError}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={userPasswordCheck} />
                    {passwordError && <p className="text-danger" style={{ fontSize: "10px" }}>{passwordError}</p>}
                </Form.Group>
                <Button variant="" className='btn-clr w-100' type="submit">Register</Button>
            </Form>
            <ToastMessage showToast={showToast} toastMessage={toastMessage} toastClr={toastClr} />
        </>
    );
};

export default SignUp;
