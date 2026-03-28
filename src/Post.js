import { useState, useRef, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { likePost, addComment, deletePost, archivePost } from "./api";

function Post({ id, onDelete, onArchive, name, description, message, photoUrl, image, video, document: doc, timestamp, likes_count = 0, liked_by_me = false, comments: initialComments = [], is_archived = false }) {
  const [liked, setLiked] = useState(liked_by_me);
  const [likes, setLikes] = useState(likes_count);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLike = async () => {
    try {
      const res = await likePost(id);
      setLiked(res.data.liked);
      setLikes(res.data.likes_count);
    } catch {
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    }
  };

  const handleDelete = async () => {
    setMenuOpen(false);
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      if (onDelete) onDelete(id);
    } catch (err) {
      const msg = err?.response?.status === 404
        ? "You can only delete your own posts."
        : err?.response?.status === 401
        ? "You must be logged in to delete."
        : "Could not delete post.";
      alert(msg);
    }
  };

  const handleArchive = async () => {
    setMenuOpen(false);
    try {
      const res = await archivePost(id);
      if (onArchive) onArchive(id, res.data.is_archived);
    } catch (err) {
      const msg = err?.response?.status === 404
        ? "You can only archive your own posts."
        : err?.response?.status === 401
        ? "You must be logged in to archive."
        : "Could not archive post.";
      alert(msg);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await addComment(id, comment);
      setComments([...comments, res.data]);
      setComment("");
    } catch {
      setComments([...comments, { id: Date.now(), author: { username: 'You' }, content: comment, replies: [] }]);
      setComment("");
    }
  };

  const addReply = (index, replyText) => {
    const updated = [...comments];
    if (!updated[index].replies) updated[index].replies = [];
    updated[index].replies.push(replyText);
    setComments(updated);
  };

  return (
    <div className="post">
      {/* Header */}
      <div className="post__header">
        <Avatar src={photoUrl}>{name ? name[0] : ""}</Avatar>
        <div className="post__info">
          <h3>{name}</h3>
          <p>{description}</p>
          {timestamp && <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>{new Date(timestamp).toLocaleDateString()}</span>}
        </div>

        {/* Three-dot menu */}
        <div className="post__menu" ref={menuRef}>
          <button className="post__menuBtn" onClick={() => setMenuOpen(!menuOpen)}>•••</button>
          {menuOpen && (
            <div className="post__menuDropdown">
              <div className="post__menuItem" onClick={handleArchive}>
                📦 {is_archived ? 'Unarchive' : 'Archive'}
              </div>
              <div className="post__menuItem post__menuItem--delete" onClick={handleDelete}>
                🗑️ Delete
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="post__body">
        {message && <p>{message}</p>}
        {image && (
          <img src={image} alt="post" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginTop: '8px', borderRadius: '2px' }}
            onError={(e) => { e.target.style.display = 'none'; }} />
        )}
        {video && (
          <video src={video} controls style={{ width: '100%', maxHeight: '500px', marginTop: '8px', borderRadius: '2px', background: '#000' }}
            onError={(e) => { e.target.style.display = 'none'; }} />
        )}
        {doc && (
          <a href={doc} target="_blank" rel="noreferrer" className="post__docAttachment">
            <AttachFileIcon style={{ fontSize: 18 }} />
            <span>{doc.split('/').pop()}</span>
            <span className="post__docBadge">PDF / DOC</span>
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="post__buttons">
        <div onClick={handleLike} className="likeBtn">
          <InputOption Icon={liked ? ThumbUpAltIcon : ThumbUpAltOutlinedIcon} title={`Like${likes > 0 ? ` (${likes})` : ''}`} color={liked ? "#0a66c2" : "gray"} />
        </div>
        <div onClick={() => setShowCommentBox(!showCommentBox)}>
          <InputOption Icon={ChatBubbleOutlineOutlinedIcon} title="Comment" color="gray" />
        </div>
        <div onClick={() => navigator.clipboard.writeText(message || '')}>
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        </div>
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>

      {/* Comments */}
      {showCommentBox && (
        <div className="commentBox">
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." onKeyDown={(e) => e.key === 'Enter' && handleAddComment()} />
          <button onClick={handleAddComment}>Post</button>
          {comments.map((c, index) => (
            <CommentItem key={c.id || index} comment={c} index={index} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment, index, addReply }) {
  const [replyBox, setReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  return (
    <div className="comment">
      <p>💬 <b>{comment.author?.username || 'User'}:</b> {comment.content || comment.text}</p>
      <span className="replyBtn" onClick={() => setReplyBox(!replyBox)}>Reply</span>
      {replyBox && (
        <div className="replyBox">
          <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
          <button onClick={() => { addReply(index, replyText); setReplyText(""); setReplyBox(false); }}>Reply</button>
        </div>
      )}
      <div className="replies">
        {(comment.replies || []).map((r, i) => (
          <p key={i}>↪️ {typeof r === 'string' ? r : r.content}</p>
        ))}
      </div>
    </div>
  );
}

export default Post;
