import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand, NavbarText, Button } from 'reactstrap';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext.userState;

    const logout = () => {
        userContext.userDispatch({ type: 'logout', payload: initialUserState });
    };
    return (
        <Navbar color="light" light sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>
                <Nav className="mr-auto" navbar />
                {user._id === '' ? (
                    <div className="d-flex w-auto">
                        <NavbarText tag={Link} to="/login">
                            Login
                        </NavbarText>
                        <NavbarText className="mx-3">|</NavbarText>
                        <NavbarText tag={Link} to="/register">
                            Sign Up
                        </NavbarText>
                    </div>
                ) : (
                    <div>
                        <Button outline tag={Link} to="/edit">
                            Create a Blog
                        </Button>
                        <NavbarText className="mr-2 ml-2">|</NavbarText>
                        <Button className="btn-danger text-white" onClick={() => logout()}>
                            Logout
                        </Button>
                    </div>
                )}
            </Container>
        </Navbar>
    );
};

export default Navigation;
