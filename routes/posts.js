// Import modules
const { Router } = require('express');
const Post = require('../mongodb.js');

// Declaration
const router = Router();

// Shows the top 10 latest posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error.message);
    };
});

// Gets the details of a specific post
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.find({_id: id});
        res.json(post);
    } catch (error) {
        console.error(error.message);
    };
});

// POST requests
router.post('/', async (req, res) => {
    try {
        const { postBody } = req.body; 
        const post = await new Post({
           postBody: postBody
        })

        post.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.error(error.message);
    };
});

// PUT requests
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { postBody } = req.body;
        const updatePost = await Post.updateOne(
            {_id:  id},
            {$set : {postBody: postBody}}
        );
        const updatedPost = await Post.find({_id: id});
        res.json(updatedPost);
    } catch (error) {
        console.error(error.message);
    }
});

// // DELETE requests
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletePost = await pool.query("DELETE FROM posts WHERE postid  = $1", [id]);
//         res.json(`Post with ID ${id} was deleted!`)
//     } catch (error) {
//         console.error(error.message);
//     }
// });


module.exports = router;