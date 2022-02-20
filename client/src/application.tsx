import React, { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';
import { initialUserState, UserContextProvider, userReducer } from './contexts/user';
import './assets/styles/dots.css';
import LoadingComponent from './components/LoadingComponent';
import AuthRoute from './components/AuthRoute';
import { Validate } from './modules/auth';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);

    /** debug */
    const [authStage, setAuthStage] = useState<string>('Checking localstorage...');

    useEffect(() => {
        setTimeout(() => {
            checkLocalStorageForCredentials();
        }, 1000);
    }, []);

    /**
     * Check if token exist
     * Verify with backend if exist
     * logout if not
     */
    const checkLocalStorageForCredentials = () => {
        setAuthStage('Checking credentials...');

        const fire_token = localStorage.getItem('fire_token');

        if (fire_token === null) {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthStage('No credentials found');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            return Validate(fire_token, (error, user) => {
                if (error) {
                    console.log(error);
                    setAuthStage('User not found, logging out...');
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthStage('User authenticated');
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
        }
    };

    const userContextValues = {
        userState,
        userDispatch
    };

    if (loading) {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Routes>
                {routes.map((route, index) => {
                    if (route.auth) {
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <AuthRoute>
                                    <route.element />
                                </AuthRoute>
                            }
                        />;
                    }
                    return <Route key={index} path={route.path} element={<route.element />} />;
                })}
            </Routes>
        </UserContextProvider>
    );
};

export default Application;
