import React, { useState } from 'react';
import { Tab, Nav, Container } from 'react-bootstrap';
import SignUp from './SignUp';
import Login from './Login';

const Home = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className='container-wrapper'>
            <Container className="mt-5 home-content">
            <h4 className='text-center mb-4'>TrackSpend</h4>
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="pills" className="d-flex justify-content-around mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="login">
                        <Login />
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                        <SignUp />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
        </div>
        
    );
};

export default Home;
