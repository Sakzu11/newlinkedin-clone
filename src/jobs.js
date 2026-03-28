import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./jobs.css";
import JobCard from "./jobcard";
import imageImg from './image.png';
import profilepicImg from './profilepic.png';
import ListIcon from '@mui/icons-material/List';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import premiumImg from './premium.png';
import { fetchJobs, searchJobs, createJob, fetchProfile } from './api';

const EXTRA_JOBS = [
  { id: 'e1', title: "React Developer", company: "Google", location: "Bangalore, India", description: "Full Time · Remote · 2 days ago" },
  { id: 'e2', title: "Full Stack Engineer", company: "Amazon", location: "Hyderabad, India", description: "Full Time · On-site · 1 day ago" },
  { id: 'e3', title: "UI/UX Designer", company: "Flipkart", location: "Pune, India", description: "Contract · Hybrid · 3 days ago" },
  { id: 'e4', title: "Data Scientist", company: "Microsoft", location: "Mumbai, India", description: "Full Time · Remote · 5 days ago" },
  { id: 'e5', title: "DevOps Engineer", company: "Infosys", location: "Chennai, India", description: "Full Time · On-site · 1 week ago" },
  { id: 'e6', title: "Python Developer", company: "Wipro", location: "Noida, India", description: "Full Time · Hybrid · 2 days ago" },
  { id: 'e7', title: "Android Developer", company: "Paytm", location: "Delhi, India", description: "Full Time · On-site · 4 days ago" },
  { id: 'e8', title: "ML Engineer", company: "Zomato", location: "Gurgaon, India", description: "Full Time · Remote · 6 days ago" },
];

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({ title: "", company: "", location: "", description: "" });
  const [postError, setPostError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
    fetchProfile().then(r => setProfile(r.data)).catch(() => {});
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchJobs(search, location);
      setJobs(res.data);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = async () => {
    if (!postForm.title || !postForm.company || !postForm.location) {
      setPostError("Title, company and location are required.");
      return;
    }
    setPostLoading(true);
    setPostError("");
    try {
      const res = await createJob(postForm);
      setJobs([res.data, ...jobs]);
      setShowPostModal(false);
      setPostForm({ title: "", company: "", location: "", description: "" });
    } catch (err) {
      setPostError(err?.response?.status === 401 ? "You must be logged in to post a job." : "Failed to post job.");
    } finally {
      setPostLoading(false);
    }
  };

  // Merge real + extra, apply filter
  const allJobs = [
    ...jobs.map(j => ({ id: j.id, title: j.title, company: j.company, location: j.location, description: j.description })),
    ...(search || location ? [] : EXTRA_JOBS),
  ].filter(j => activeFilter === "All" || j.description?.includes(activeFilter));

  const filters = ["All", "Remote", "Full Time", "Internship", "Contract"];
  const name = profile ? `${profile.user?.first_name || ''} ${profile.user?.last_name || profile.user?.username}`.trim() : '';

  return (
    <div className="jobs-page">
      {/* LEFT */}
      <div className="jobs-left">
        <div className="profile-card">
          <img src={imageImg} alt="banner" />
          <div className="job__sidebar">
            <Avatar className="avatar" src={profile?.avatar || profilepicImg} />
          </div>
          <h2>{name || 'Your Name'}</h2>
          <h3>{profile?.user?.email}</h3>
          <p>{profile?.headline || 'Add a headline'}</p>
        </div>

        <div className="jobs-menu">
          <a href="#"><BookmarkIcon /><span>My Jobs</span></a>
          <a href="#"><ListIcon /><span>Preferences</span></a>
          <a href="#"><img src={premiumImg} alt="Premium" className="image" /><span>My career insight</span></a>
          <div className="post-job" onClick={() => setShowPostModal(true)}>+ Post Free Job</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="jobs-right">
        {/* Search */}
        <div className="jobs-search">
          <div className="jobs-search__field">
            <SearchIcon style={{ color: 'rgba(0,0,0,0.4)', fontSize: 20 }} />
            <input
              placeholder="Job title or keyword"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="jobs-search__field">
            <LocationOnIcon style={{ color: 'rgba(0,0,0,0.4)', fontSize: 20 }} />
            <input
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="jobs-search__btn" onClick={handleSearch}>Search</button>
        </div>

        {/* Filters */}
        <div className="jobs-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`jobs-filter-btn ${activeFilter === f ? 'jobs-filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <h2>
          Jobs Recommended for You{" "}
          <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>
            ({allJobs.length} results)
          </span>
        </h2>

        <div className="sidebar__container">
          {loading ? (
            <p style={{ padding: '20px', color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>Loading jobs...</p>
          ) : allJobs.length === 0 ? (
            <p style={{ padding: '20px', color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>No jobs found for "{search}".</p>
          ) : (
            allJobs.map((job) => (
              <JobCard key={job.id} title={job.title} company={job.company} location={job.location} type={job.description} />
            ))
          )}
        </div>
      </div>

      {/* POST JOB MODAL */}
      {showPostModal && (
        <div className="jobs-modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="jobs-modal" onClick={e => e.stopPropagation()}>
            <div className="jobs-modal__header">
              <h2>Post a Free Job</h2>
              <button className="jobs-modal__close" onClick={() => setShowPostModal(false)}><CloseIcon /></button>
            </div>
            <div className="jobs-modal__body">
              {[
                ["Job Title *", "title", "e.g. Frontend Developer"],
                ["Company *", "company", "e.g. Google"],
                ["Location *", "location", "e.g. Bangalore, India"],
              ].map(([label, key, placeholder]) => (
                <div key={key} className="jobs-modal__field">
                  <label>{label}</label>
                  <input
                    className="jobs-modal__input"
                    placeholder={placeholder}
                    value={postForm[key]}
                    onChange={e => setPostForm({ ...postForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="jobs-modal__field">
                <label>Job Description</label>
                <textarea
                  className="jobs-modal__input jobs-modal__textarea"
                  placeholder="Describe the role, requirements, and benefits..."
                  value={postForm.description}
                  onChange={e => setPostForm({ ...postForm, description: e.target.value })}
                />
              </div>
              {postError && <p style={{ color: 'red', fontSize: 13, margin: '4px 0' }}>{postError}</p>}
            </div>
            <div className="jobs-modal__footer">
              <button className="jobs-modal__cancel" onClick={() => setShowPostModal(false)}>Cancel</button>
              <button className="jobs-modal__submit" onClick={handlePostJob} disabled={postLoading}>
                {postLoading ? "Posting..." : "Post Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
