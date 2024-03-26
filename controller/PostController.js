import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create article",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to getting all posts",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to getting post with ${req.params.id} id`,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId });
    if (!post) {
      return res.json({ message: "Post is not valid" });
    }
    return res.json({
      message: "Congratulations, you have deleted the post",
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500)
  }
};
export const update = async(req,res)=>{
    try{
        const postId=req.params.id;
       await PostModel.updateOne({
        _id:postId
       },
       {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      });
      res.json({
        success:true
      })
      }
    
    catch(err){
        res.status(500)
    }
}