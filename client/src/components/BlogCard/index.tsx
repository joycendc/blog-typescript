import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export interface IBlogCardProps {
    _id: string;
    title: string;
    headline: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

const BlogCard: React.FunctionComponent<IBlogCardProps> = (props) => {
    const { _id, title, headline, author, createdAt, updatedAt, children } = props;

    return (
        <Card className="border-0">
            <CardBody className="p-0">
                <Link className="text-primary" to={`/blogs/${_id}`} style={{ textDecoration: 'none' }}>
                    <h1>
                        <strong>{title}</strong>
                    </h1>
                    <h3>{headline}</h3>
                    <br />
                </Link>
                {createdAt !== updatedAt ? (
                    <p>
                        Updated by {author} at {new Date(updatedAt).toLocaleString()}
                    </p>
                ) : (
                    <p>
                        Posted by {author} at {new Date(updatedAt).toLocaleString()}
                    </p>
                )}
                {children}
            </CardBody>
        </Card>
    );
};

export default BlogCard;
