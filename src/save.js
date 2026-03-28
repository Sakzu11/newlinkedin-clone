import { useState, useEffect } from "react";
import "./save.css";
import noJobImage from "./no-job.png";
import api from "./api";
import Post from "./Post";

function SavedJobs() {
  const [activeTab, setActiveTab] = useState("Saved");
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "Archived") {
      setLoading(true);
      api.get('/posts/archived/')
        .then((res) => setArchivedPosts(res.data))
        .catch(() => setArchivedPosts([]))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const handleUnarchive = (id) => {
    setArchivedPosts(archivedPosts.filter(p => p.id !== id));
  };

  const emptyState = (
    <div className="emptyState">
      <img src={noJobImage} alt="No activity" />
      <h2>No recent activity</h2>
      <p>Find new opportunities and manage your progress here.</p>
      <button className="searchBtn">Search for jobs</button>
    </div>
  );

  return (
    <div className="jobsContainer">
      <h1 className="jobsTitle">My Jobs</h1>

      <div className="jobsTabs">
        {["Saved", "In Progress", "Applied", "Archived"].map((tab) => (
          <button
            key={tab}
            className={`tabButton ${activeTab === tab ? "activeTab" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== "Archived" && emptyState}

      {activeTab === "Archived" && (
        loading ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'rgba(0,0,0,0.5)' }}>Loading...</p>
        ) : archivedPosts.length === 0 ? (
          <div className="emptyState">
            <img src={noJobImage} alt="No archived posts" />
            <h2>No archived posts</h2>
            <p>Posts you archive will appear here.</p>
          </div>
        ) : (
          archivedPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={`${post.author?.first_name || ''} ${post.author?.last_name || post.author?.username}`.trim()}
              description={post.author?.username}
              message={post.content}
              image={post.image}
              video={post.video}
              timestamp={post.created_at}
              likes_count={post.likes_count}
              liked_by_me={post.liked_by_me}
              comments={post.comments}
              is_archived={true}
              onArchive={handleUnarchive}
            />
          ))
        )
      )}
    </div>
  );
}

export default SavedJobs;
