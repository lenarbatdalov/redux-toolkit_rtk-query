import React, {FC} from 'react';
import {IPost} from "../models/IPost";

interface PostItemProps {
  post: IPost;
  update: (post: IPost) => void;
  remove: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, update, remove}) => {
  const handleUpdate = (event: React.MouseEvent) => {
    event.stopPropagation()
    const title = prompt() || ""
    update({...post, title: title})
  }

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(post)
  }

  return (
    <div className="post" onClick={handleUpdate}>
      <h3>{post.title}</h3>
      <div>{post.body}</div>

      <button
        onClick={handleRemove}
      >Удалить</button>
    </div>
  );
};

export default PostItem;