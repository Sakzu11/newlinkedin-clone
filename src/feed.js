import { useState, useEffect, useRef } from "react";
import './Feed.css';
import Post from './Post';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Avatar } from '@mui/material';
import profilepicImg from './profilepic.png';
import { fetchPosts, createPost } from './api';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState("");
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);

  useEffect(() => {
    const load = () => {
      fetchPosts()
        .then((res) => setPosts(res.data))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    };
    load();
    window.addEventListener('focus', load);
    return () => window.removeEventListener('focus', load);
  }, []);

  const handleImageClick = () => fileInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();
  const handleDocClick = () => docInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(URL.createObjectURL(file)); setImageFile(file); setVideo(null); setVideoFile(null); setDocFile(null); setIsModalOpen(true); }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setVideo(URL.createObjectURL(file)); setVideoFile(file); setImage(null); setImageFile(null); setDocFile(null); setIsModalOpen(true); }
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) { setDocFile(file); setImage(null); setImageFile(null); setVideo(null); setVideoFile(null); setIsModalOpen(true); }
  };

  const handleCreatePost = async () => {
    if (!postText.trim() && !imageFile && !videoFile && !docFile) return;
    const formData = new FormData();
    formData.append('content', postText.trim() || '');
    if (imageFile) formData.append('image', imageFile);
    if (videoFile) formData.append('video', videoFile);
    if (docFile) formData.append('document', docFile);
    console.log('imageFile:', imageFile);
    for (let [k, v] of formData.entries()) console.log('FormData:', k, v);
    setPostError("");
    try {
      const res = await createPost(formData);
      console.log('Post response:', JSON.stringify(res.data));
      setPosts([res.data, ...posts]);
      setPostText(""); setImage(null); setImageFile(null);
      setVideo(null); setVideoFile(null); setDocFile(null);
      setIsModalOpen(false);
    } catch (err) {
      const status = err?.response?.status;
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      if (status === 401) setPostError("You must be logged in to post.");
      else if (status === 413) setPostError("File too large. Please use a smaller file.");
      else setPostError(`Failed to post (${status || 'network error'}): ${detail}`);
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input" onClick={() => setIsModalOpen(true)}>
          <Avatar className="feed__avatar" src={profilepicImg} alt="Profile" />
          <input type="text" placeholder="Start a post, try writing an article" readOnly className="feed__inputField" />
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#2981d9" onClick={handleImageClick} />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#317f2c" onClick={handleVideoClick} />
          <InputOption Icon={AttachFileIcon} title="Document" color="#e06c00" onClick={handleDocClick} />
          <InputOption Icon={ArticleIcon} title="Write article" color="#bb680f" onClick={() => setIsModalOpen(true)} />
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        <input type="file" accept="video/*" ref={videoInputRef} style={{ display: "none" }} onChange={handleVideoChange} />
        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt" ref={docInputRef} style={{ display: "none" }} onChange={handleDocChange} />
      </div>

      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Create a post</h2>
              <button className="modal__closeBtn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className="modal__body">
              <div className="modal__user">
                <Avatar className="modal__avatar" src={profilepicImg} />
                <div><h4>You</h4></div>
              </div>
              <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="What do you want to talk about?" className="modal__textarea" autoFocus />
              {image && (
                <div className="modal__imagePreview">
                  <img src={image} alt="Preview" />
                  <button className="modal__removeImage" onClick={() => { setImage(null); setImageFile(null); }}>✕</button>
                </div>
              )}
              {video && (
                <div className="modal__imagePreview">
                  <video src={video} controls style={{ width: '100%', borderRadius: '4px' }} />
                  <button className="modal__removeImage" onClick={() => { setVideo(null); setVideoFile(null); }}>✕</button>
                </div>
              )}
              {docFile && (
                <div className="modal__docPreview">
                  <AttachFileIcon style={{ color: '#e06c00' }} />
                  <span>{docFile.name}</span>
                  <button className="modal__removeImage" onClick={() => setDocFile(null)}>✕</button>
                </div>
              )}
            </div>
            <div className="modal__footer">
              <button className="modal__imageBtnSmall" onClick={handleImageClick}>📷 Photo</button>
              <button className="modal__imageBtnSmall" onClick={handleVideoClick}>🎥 Video</button>
              <button className="modal__imageBtnSmall" onClick={handleDocClick}>📎 Document</button>
              {postError && <span style={{ color: 'red', fontSize: '12px', flex: 1 }}>{postError}</span>}
              <button className="modal__postBtn" onClick={handleCreatePost} disabled={!postText.trim() && !imageFile && !videoFile && !docFile}>Post</button>
            </div>
          </div>
        </div>
      )}

      <div className="feed__posts">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'rgba(0,0,0,0.6)' }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="feed__empty"><p>No posts yet. Be the first to share something!</p></div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={`${post.author?.first_name || ''} ${post.author?.last_name || post.author?.username}`.trim()}
              description={post.author?.username}
              message={post.content}
              photoUrl=""
              image={post.image_url}
              video={post.video_url}
              document={post.document_url}
              timestamp={post.created_at}
              likes_count={post.likes_count}
              liked_by_me={post.liked_by_me}
              comments={post.comments}
              is_archived={post.is_archived}
              onDelete={(id) => setPosts(posts.filter(p => p.id !== id))}
              onArchive={(id) => setPosts(posts.filter(p => p.id !== id))}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
