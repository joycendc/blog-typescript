import { Request, Response, NextFunction } from 'express';
import Blog from '../models/blog';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
    console.log('Attempting to create blog...');

    let { title, author, content, headline, picture } = req.body;

    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        content,
        headline,
        picture
    });

    return blog
        .save()
        .then((newBlog) => {
            console.log(`New blog created.`);

            return res.status(200).json({
                blog: newBlog
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    console.log(`Incoming read for ${_id} ...`);

    return Blog.findById(_id)
        .populate('author')
        .then((blog) => {
            if (blog) {
                return res.status(200).json({ blog });
            } else {
                return res.status(404).json({ message: 'Blog not found' });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming read all...`);

    return Blog.find()
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({ count: blogs.length, blogs });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};
const query = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming query...`);

    return Blog.find(req.body)
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({ count: blogs.length, blogs });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};
const update = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    console.log(`Incoming update for ${_id} ...`);

    return Blog.findById(_id)
        .exec()
        .then((blog) => {
            if (blog) {
                blog.set(req.body);

                blog.save()
                    .then((newBlog) => {
                        console.log(`Blog updated.`);

                        return res.status(200).json({
                            blog: newBlog
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({
                            err
                        });
                    });
            } else {
                return res.status(402).json({ message: 'Blog not found' });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    console.log(`Incoming delete for ${_id} ...`);

    return Blog.findByIdAndDelete(_id)
        .then(() => {
            return res.status(200).json({ message: 'Blog deleted' });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                err
            });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteBlog
};
