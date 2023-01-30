const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

exports.getPosts = asyncHandler(async (req, res) => {
    // console.log("req.query", req.query);

    // const { pageSize, page } = req.query;
    // let PostQuery = Post.find();
    // if(pageSize && page){
    //     console.log("hitting here")
    //     PostQuery
    //     .skip(+pageSize * (+page - 1))
    //     .limit(10);
    // }

    // const posts = await PostQuery();

    // res.json({ success: true, length: posts.length, data: posts });

    const pageSize = req.query.pageSize;
    const currentPage = req.query.page;
    const postQuery = Post.find();

    console.log(req.query);

    if(pageSize && currentPage){
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    const posts = await postQuery.find();

    console.log("posts", posts);

    res.json({ success: true, length: posts.length, data: posts });

    
});

exports.getPost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.json({ success: true, data: post });
});

exports.createPost = asyncHandler(async (req, res) => {
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`  
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        image: url
    });
    res.status(201).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });

    post.remove();

    res.status(201).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(201).json({ success: true, data: post });
});