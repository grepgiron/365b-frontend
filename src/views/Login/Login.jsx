import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header, Content, Footer, Form, Button, ButtonToolbar, FlexboxGrid, Navbar, Panel } from 'rsuite';

const Login = () => {

    return (
        <div className="Login">
            <div className="show-fake-browser login-page">
                <Container>
                <Header>
                    <Navbar appearance="inverse">
                    <Navbar.Header>
                        <span className="navbar-brand logo">365 Beauty Salon</span>
                    </Navbar.Header>
                    </Navbar>
                </Header>
                <Content>
                    <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={8}>
                        <Panel header={<h3>Login</h3>} bordered>
                        <Form fluid>
                            <Form.Group>
                            <Form.ControlLabel>Usuario</Form.ControlLabel>
                            <Form.Control name="user" />
                            </Form.Group>
                            <Form.Group>
                            <Form.ControlLabel>Contrasena</Form.ControlLabel>
                            <Form.Control name="pass" type="password" autoComplete="off" />
                            </Form.Group>
                            <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary">Ingresar</Button>
                            </ButtonToolbar>
                            </Form.Group>
                        </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                </Container>
            </div>
        </div>
    );
}

export default Login;