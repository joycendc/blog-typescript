import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import BlogCard from '../components/BlogCard';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import Navigation from '../components/Navigation';
import config from '../config/config';
import IBlog from '../interfaces/blog';
import IPageProps from '../interfaces/page';
import IUser from '../interfaces/user';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllBLogs();
    }, []);

    const getAllBLogs = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs`
            });

            if (response.status === 200 || response.status === 304) {
                let blogs = response.data.blogs as IBlog[];
                blogs.sort((i, j) => j.updatedAt.localeCompare(i.updatedAt));
                setBlogs(blogs);
            }
        } catch (error) {
            console.log(error);
            setError('Unable to retrieve blogs');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    if (loading) {
        return <LoadingComponent>Retrieving blogs...</LoadingComponent>;
    }

    return (
        <Container>
            <Navigation />
            <Header title="Anyone's Blog" headline="Read other people ideas" />
            <Container className="mt-5">
                {blogs.length === 0 ? (
                    <p className="h4">
                        Theres no blogs yet, you can <Link to="/edit">create</Link> one. :)
                    </p>
                ) : (
                    <>
                        {blogs.map((blog, index) => (
                            <div key={index}>
                                <BlogCard _id={blog._id} author={(blog.author as IUser).name} headline={blog.headline} title={blog.title} createdAt={blog.createdAt} updatedAt={blog.updatedAt} />
                                <hr />
                            </div>
                        ))}
                    </>
                )}
                <ErrorMessage error={error}/>
            </Container>
        </Container>
    );
};

export default HomePage;
