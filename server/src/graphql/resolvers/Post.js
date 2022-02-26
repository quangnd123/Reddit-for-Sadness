import Post from "../../database/Post.js";
import { checkAuth } from "../../utils/checkAuth.js";
import { AuthenticationError } from "apollo-server-errors";
import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server-errors";

export const PostResolver = {
  Query: {
    async getPosts(parent, args, context) {
      try {
        const postDB = context.db.collection("Post");
        var posts = await postDB.find().sort({ createdAt: -1 });
        return posts.toArray();
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(parent, { postID }, context) {
      try {
        const postDB = context.db.collection("Post");
        const post = await postDB.findOne({ _id: ObjectId(postID) });
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { createPostInput: { title, text } }, context) {
      const postDB = context.db.collection("Post");
      const user = checkAuth(context);

      if (title.trim() === "") {
        throw new UserInputError("Title must not be empty", {
          errors: {
            title: "Title must not be empty",
          },
        });
      }
      if (text.trim() === "") {
        throw new UserInputError("Text must not be empty", {
          errors: {
            text: "Text must not be empty",
          },
        });
      }

      const newPost = new Post({
        title: title,
        text: text,
        userID: user._id,
        username: user.username,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        count: 0,
      });
      const { insertedId } = await postDB.insertOne(newPost);
      const post = await postDB.findOne({ _id: ObjectId(insertedId) });
      return post;
    },
    async deletePost(_, { postID }, context) {
      const postDB = context.db.collection("Post");
      const user = checkAuth(context);
      try {
        const post = await postDB.findOne({ _id: ObjectId(postID) });
        console.log(post);
        if (!post) {
          throw new Error("Post not found");
        }
        if (!user._id === post.userID) {
          throw new AuthenticationError("Action not allowed");
        }
        await postDB.deleteOne({ _id: ObjectId(postID) });
        return "Post deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    async createComment(_, { postID, text }, context) {
      const user = checkAuth(context);
      const postDB = context.db.collection("Post");
      const post = await postDB.findOne({ _id: ObjectId(postID) });
      if (!post) {
        throw new Error("Post not found");
      }
      await postDB.updateOne(
        { _id: ObjectId(postID) },
        {
          $push: {
            comments: {
              _id: ObjectId(),
              userID: user._id,
              username: user.username,
              text: text,
              createdAt: Date.now(),
            },
          },
        }
      );
      const updatedPost = await postDB.findOne({ _id: ObjectId(postID) });
      return updatedPost;
    },
    async deleteComment(_, { postID, commentID }, context) {
      const user = checkAuth(context);
      const postDB = context.db.collection("Post");
      const post = await postDB.findOne({ _id: ObjectId(postID) });
      if (!post) {
        throw new Error("Post not found");
      }
      const comment = post.comments.find(
        (element) => String(element._id) === String(commentID)
      );
      console.log(post.comments);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (user._id !== comment.userID) {
        throw new AuthenticationError("Action not allowed");
      }
      await postDB.updateOne(
        { _id: ObjectId(postID) },
        { $pull: { comments: { _id: ObjectId(commentID) } } },
        false,
        true
      );
      const updatedPost = await postDB.findOne({ _id: ObjectId(postID) });
      return updatedPost;
    },
    async likePost(_, { postID }, context) {
      const user = checkAuth(context);
      const postDB = context.db.collection("Post");
      const post = await postDB.findOne({ _id: ObjectId(postID) });
      if (!post) {
        throw new Error("Post not found");
      }
      const like = post.likes.find(
        (element) => String(element.userID) === String(user._id)
      );

      if (!like) {
        await postDB.updateOne(
          { _id: ObjectId(postID) },
          {
            $push: {
              likes: {
                userID: user._id,
                username: user.username,
                createdAt: Date.now(),
              },
            },
            $inc: { count: 1 },
          }
        );
      } else {
        await postDB.updateOne(
          { _id: ObjectId(postID) },
          {
            $pull: { likes: { userID: user._id } },
            $inc: { count: -1 },
          },
          false,
          true
        );
      }
      const updatedPost = await postDB.findOne({ _id: ObjectId(postID) });
      return updatedPost;
    },
  },
};
