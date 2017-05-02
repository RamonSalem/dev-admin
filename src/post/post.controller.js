const postDba = require('./post.dba');

exports.postPostage = async (req, res)=>{
    const newPost = {
        title : req.body.title,
        description : req.body.description,
        postedBy : req.body.postedBy,
        type : req.body.type,
        tags : req.body.tags 
    }
    try{
        res.status(200).json(await postDba.create(newPost) );
    }catch(err){
        res.status(500).json(err);
    }
}

exports.getAllPosts = async (req, res)=>{
    try{
        const allPosts = await postDba.getPosts(); 
        res.status(allPosts.code).json(allPosts);
    }catch(err){
        res.status(err.code).json(err);
    }
}

exports.getPost = async (req, res)=>{
    
    try{
        const postId = req.params.id;
        const post = await postDba.getPost(postId); 
        return res.status(post.code).json(post);
    }catch(err){
        return res.status(err.code).json(err);
    }
}

exports.putPost = async (req, res)=>{
    const postId = req.params.id;
    const updatedPost = {
        title : req.body.title,
        description : req.body.description,
        postedBy : req.body.postedBy,
        type : req.body.type,
        tags : req.body.tags 
    }

    if(!updatedPost.title || !updatedPost.description || !updatedPost.postedBy || !updatedPost.type ){
        return res.status(400).json({result : updatedPost, code : 400, message : 'Information missing.'});
    }

    try{
        const post = await postDba.putPost(postId, updatedPost); 
        return res.status(post.code).json(post);
    }catch(err){
        return res.status(err.code).json(err);
    }
}


exports.deletePost = async (req, res)=>{
    
    try{
        const postId = req.params.id;
        const post = await postDba.deletePost(postId); 
        return res.status(post.code).json(post);
    }catch(err){
        return res.status(err.code).json(err);
    }
}