const Posts = require('./post.model');

exports.create = (newPost)=>{
    newPost.postDate = new Date();
    const post = new Posts(newPost);
    return post.save(); //returns a promise
}

/*
exports.getPosts = ()=>{
    return new Promise((resolve, reject)=>{
        Posts.find({}).exec().then(result=>{
            resolve({result : result, code : 200});
        }).catch(err=>{
            reject({result : err, code : 500, message : 'An error has occurred when accessing the database.'});
        });
    });
}
*/

exports.getPosts = ()=>{
    return Posts.find({}).exec().then(result=>{
        return {result : result, code : 200};
    }).catch(err=>{
        return {result : err, code : 500, message : 'An error has occurred when accessing the database.'};
    });
    
}

exports.getPost = (postId)=>{
    
   return Posts.findOne( {_id : postId} ).then((result)=>{
        return {result : result, code : 200};
    }).catch((err)=>{
        return {result : err, code : 500, message : 'An error has occurred when getting the postage.'};
    });
    
}

exports.deletePost = (postId)=>{
    
   return Posts.findByIdAndRemove( {_id : postId} ).then((postage)=>{
        return {result : 'Removed', code : 200};
    }).catch((err)=>{
        return {result : err, code : 500, message : 'An error has occurred when deleting the postage.'};
    });
    
}

exports.putPost = (postId, newPostObj)=>{
   newPostObj.postDate = new Date();     
   return Posts.findOneAndUpdate( {_id : postId }, newPostObj, {new : true} ).then((result)=>{
        return {result : result, code : 200};
    }).catch((err)=>{
        return {result : err, code : 500, message : 'An error has occurred when editing the postage.'};
    });
    
}


