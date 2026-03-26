import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Post({
  id,
  onDelete,
  name,
  description,
  message,
  photoUrl,
  image,
  video,
  timestamp,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(123);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  // 👍 LIKE WITH ANIMATION
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  // 💬 ADD COMMENT
  const addComment = () => {
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        text: comment,
        replies: [],
      },
    ]);

    setComment("");
  };

  // 💬 ADD REPLY
  const addReply = (index, replyText) => {
    const updated = [...comments];
    updated[index].replies.push(replyText);
    setComments(updated);
  };

  return (
    <div className="post">
      {/* HEADER */}
      <div className="post__header">
        <Avatar src={photoUrl}>
          {name ? name[0] : ""}
        </Avatar>

        <div className="post__info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="post__body">
        <p>{message}</p>
      </div>

      {/* ACTIONS */}
      <div className="post__buttons">
        <div onClick={handleLike} className="likeBtn">
          <InputOption
            Icon={liked ? ThumbUpAltIcon : ThumbUpAltOutlinedIcon}
            title="Like"
            color={liked ? "#0a66c2" : "gray"}
          />
        </div>

        <div onClick={() => setShowCommentBox(!showCommentBox)}>
          <InputOption
            Icon={ChatBubbleOutlineOutlinedIcon}
            title="Comment"
            color="gray"
          />
        </div>

        <div onClick={() => navigator.clipboard.writeText(message)}>
          <InputOption
            Icon={ShareOutlinedIcon}
            title="Share"
            color="gray"
          />
        </div>

        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />

        <div onClick={() => onDelete(id)}>
          <InputOption
            Icon={DeleteOutlinedIcon}
            title="Delete"
            color="gray"
          />
        </div>
      </div>

      {/* COMMENT BOX */}
      {showCommentBox && (
        <div className="commentBox">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={addComment}>Post</button>

          {/* COMMENTS */}
          {comments.map((c, index) => (
            <CommentItem
              key={index}
              comment={c}
              index={index}
              addReply={addReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 🔹 COMMENT COMPONENT WITH REPLY
function CommentItem({ comment, index, addReply }) {
  const [replyBox, setReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="comment">
      <p>💬 {comment.text}</p>

      <span
        className="replyBtn"
        onClick={() => setReplyBox(!replyBox)}
      >
        Reply
      </span>

      {replyBox && (
        <div className="replyBox">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button
            onClick={() => {
              addReply(index, replyText);
              setReplyText("");
              setReplyBox(false);
            }}
          >
            Reply
          </button>
        </div>
      )}

      {/* SHOW REPLIES */}
      <div className="replies">
        {comment.replies.map((r, i) => (
          <p key={i}>↪️ {r}</p>
        ))}
      </div>
    </div>
  );
}

export default Post;