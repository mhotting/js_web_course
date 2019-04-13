exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First post',
            content: 'This is a dummy post',
            imageUrl: '/image/duck.jpg',
            creator: {
                name: 'Madipoupou'
            },
            createdAt: new Date()
        }]
    });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Create post in DB
    console.log(title);
    res.status(201).json({
        message: 'Post created Successfully!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: 'Madipoupou' },
            createdAt: new Date()
        }
    });
};