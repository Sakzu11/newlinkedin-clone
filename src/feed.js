import React, { useState, useEffect, useRef } from "react";
import './Feed.css';
import Post from './Post';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArticleIcon from '@mui/icons-material/Article';
import { Avatar } from '@mui/material';
import profilepicImg from './profilepic.png';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
// import image from './image.png';

function Feed(){
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");

  return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
 
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);


  // Handle file selection
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImage(fileURL);
      setVideo(null); // Clear video if image is selected
      setIsModalOpen(true);
    }
  };
  const handleDeletePost = (id) => {
  const updatedPosts = posts.filter((post) => post.id !== id);
  setPosts(updatedPosts);
};

  // Handle video selection
  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideo(fileURL);
      setImage(null); // Clear image if video is selected
      setIsModalOpen(true);
    }
  };

  // Create and submit post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim() && !image && !video)
      
      return;
      // db.collection('posts').add({
      //   name:'harshada panthare',
      //   description:'this is a test',
      //   message:input

      // })

  const newPost = {
      id: Date.now(),
      name: "Sakshi Panthare",
      description: "Frontend Developer",
      message: postText,
      photoUrl: "",
      image: image,
      video: video,
      timestamp: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setImage(null);
    setVideo(null);
    setIsModalOpen(false);
  };

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    return unsubscribe; // Cleanup on unmount
  }, []);


  

// LIKE
const handleLike = (id) => {
  setPosts(
    posts.map((post) =>
      post.id === id
        ? { ...post, likes: (post.likes || 0) + 1 }
        : post
    )
  );
};

// ADD COMMENT
const handleAddComment = (id, comment) => {
  setPosts(
    posts.map((post) =>
      post.id === id
        ? {
            ...post,
            comments: [...(post.comments || []), comment],
          }
        : post
    )
  );
};

// EDIT POST
const handleEditPost = (id, newMessage) => {
  setPosts(
    posts.map((post) =>
      post.id === id ? { ...post, message: newMessage } : post
    )
  );
};

  return (
    <div className="feed">
      {/* Input Container */}
      <div className="feed__inputContainer">
        <div className="feed__input" onClick={() => setIsModalOpen(true)}>
          <Avatar className="feed__avatar" src={profilepicImg} alt="Profile" />
          <input
            type="text"
            placeholder="Start a post, try writing an article"
            readOnly
            className="feed__inputField"
          />
        </div>

         {/* Input Options  */}
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#2981d9" onClick={handleImageClick} />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#317f2c" onClick={handleVideoClick} />
          <InputOption Icon={ArticleIcon} title="Write article" color="#bb680f" onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Hidden File Inputs */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          style={{ display: "none" }}
          onChange={handleVideoChange}
        />
      </div>

      {/* Post Creation Modal */}
      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Create a post</h2>
              <button
                className="modal__closeBtn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal__divider" />

            <div className="modal__body">
              <div className="modal__user">
                
                 <div>
                <Avatar className="modal__avatar" alt="Pr" src={profilepicImg} />
               
                  <h4>Sakshi Panthare</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What do you want to talk about?"
                className="modal__textarea"
              />

              {image && (
                <div className="modal__imagePreview">
                  <img src={image} alt="Preview" />
                  <button
                    className="modal__removeImage"
                    onClick={() => setImage(null)}
                  >
                    ✕
                  </button>
                </div>
              )}

              {video && (
                <div className="modal__videoPreview">
                  <video src={video} controls style={{ width: "100%", borderRadius: "8px" }} />
                  <button
                    className="modal__removeVideo"
                    onClick={() => setVideo(null)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="modal__footer">
              <button
                className="modal__imageBtnSmall"
                onClick={handleImageClick}
              >
                📷 Photo
              </button>
              <button
                className="modal__imageBtnSmall"
                onClick={handleVideoClick}
              >
                🎥 Video
              </button>
              <button
                className="modal__postBtn"
                onClick={handleCreatePost}
                disabled={!postText.trim() && !image && !video}
              >
                Post
              </button>
            </div>
           </div>
         </div>
      )}
      

      {/* Posts Feed */}
      <div className="feed__posts">
        {posts.length === 0 ? (
          <div className="feed__empty">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              description={post.description}
              message={post.message}
              photoUrl={post.photoUrl}
              image={post.image}
              video={post.video}
              timestamp={post.timestamp}
              onDelete={handleDeletePost}
              onLike={handleLike}
              onComment={handleAddComment}
              onEdit={handleEditPost} 
            />
          ))
        )}
       
      </div>
    </div>
    
  );
}

export default Feed;