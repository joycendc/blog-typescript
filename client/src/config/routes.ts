import IRoute from '../interfaces/routes';
import BlogPage from '../pages/blog';
import EditPage from '../pages/edit';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';

const authRoutes: IRoute[] = [
    {
        path: '/login',
        auth: false,
        name: 'Login',
        element: LoginPage
    },
    {
        path: '/register',
        auth: false,
        name: 'Register',
        element: LoginPage
    }
];

const blogRoutes: IRoute[] = [
    {
        path: '/edit',
        auth: true,
        name: 'Edit',
        element: EditPage
    },
    {
        path: '/edit/:blogID',
        auth: true,
        name: 'Edit',
        element: EditPage
    },
    {
        path: '/blogs/:blogID',
        auth: true,
        name: 'Blog',
        element: BlogPage
    }
];

const mainRoutes: IRoute[] = [
    {
        path: '/',
        auth: true,
        name: 'Home',
        element: HomePage
    }
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
