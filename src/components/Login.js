import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastMessage from './ToastMessage';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(""); 
    const [toastClr, setToastClr] = useState("");
    const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/transactionApi/users`);
      const users = await response.json();
       console.log(users)
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        console.log("Login successful");
        localStorage.setItem("TransactionUser", JSON.stringify(user));
        setToastMessage("Login Successfully!");
        setToastClr("success");
        setShowToast(true); 
        setTimeout(()=>navigate("/user"),800);
        
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
    return (
      <>
      <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            {error && <p className="text-danger" style={{fontSize:"12px"}}>{error}</p>}
            <Button variant="" type="submit" className='w-100 mt-3 btn-clr'>Login</Button>
        </Form>
      <ToastMessage showToast={showToast} toastMessage={toastMessage} toastClr={toastClr} />
      </>
        
    );
};

export default Login;
