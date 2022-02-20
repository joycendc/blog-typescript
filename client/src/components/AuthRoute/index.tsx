import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/user';

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;

    const { user } = useContext(UserContext).userState;

    if (user._id === '') {
        console.log('Unauthorized, redirecting...');

        return <Navigate to="/login" />;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;
