import React from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
  const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(10, {
    pollingInterval: 10000 // TODO: long polling
  })
  const [createPost, {}] = postAPI.useCreatePostMutation()
  const [updatePost, {}] = postAPI.useUpdatePostMutation()
  const [deletePost, {}] = postAPI.useDeletePostMutation()

  const handleCreate = async () => {
    const title = prompt()
    await createPost({
      title,
      body: title
    } as IPost)
  }

  return (
    <div className="post__list">
      <button
        onClick={handleCreate}
      >Добавить пост</button>

      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Произошла ошибка.</h1>}
      {posts && posts.map(post =>
        <PostItem
          key={post.id}
          post={post}
          update={(post) => updatePost(post)}
          remove={(post) => deletePost(post)}
        />
      )}
    </div>
  );
};

export default PostContainer;