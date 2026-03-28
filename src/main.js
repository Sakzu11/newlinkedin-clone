import { useEffect, useState, useRef } from "react";
import "./main.css";
import defaultCover from "./image.png";
import defaultAvatar from "./profilepic.png";
import { Avatar } from "@mui/material";
import {
  fetchProfile, updateProfile,
  fetchExperiences, createExperience, deleteExperience,
  fetchSkills, createSkill, deleteSkill,
  fetchProjects, createProject, deleteProject,
  fetchCertificates, createCertificate, deleteCertificate,
  fetchLinks, createLink, deleteLink,
  fetchUserPosts, createPost,
} from "./api";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import VerifiedIcon from "@mui/icons-material/Verified";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Post from "./Post";
import InputOption from "./InputOption";

const MEDIA = "http://localhost:8000";
const fullUrl = (p) => p || null;

// Reusable modal
function Modal({ title, onClose, children }) {
  return (
    <div className="pf-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pf-modal__header">
          <h3>{title}</h3>
          <button className="pf-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal__body">{children}</div>
      </div>
    </div>
  );
}

// Section card
function Section({ icon, title, items, onAdd, renderItem }) {
  return (
    <div className="pf-section">
      <div className="pf-section__header">
        <div className="pf-section__title">{icon}<h2>{title}</h2></div>
        <button className="pf-icon-btn" onClick={onAdd}><AddIcon /></button>
      </div>
      {items.length === 0
        ? <p className="pf-empty">No {title.toLowerCase()} added yet.</p>
        : items.map(renderItem)}
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [links, setLinks] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postImageFile, setPostImageFile] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [postVideoFile, setPostVideoFile] = useState(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postError, setPostError] = useState("");
  const postFileRef = useRef();
  const postVideoRef = useRef();

  const [modal, setModal] = useState(null); // 'editProfile'|'exp'|'skill'|'project'|'cert'|'link'
  const avatarRef = useRef();
  const coverRef = useRef();

  // Forms
  const [bioForm, setBioForm] = useState({ headline: "", bio: "" });
  const [expForm, setExpForm] = useState({ title: "", company: "", location: "", start_date: "", end_date: "", currently_working: false, description: "" });
  const [skillForm, setSkillForm] = useState({ name: "" });
  const [projForm, setProjForm] = useState({ title: "", description: "", url: "", start_date: "", end_date: "" });
  const [certForm, setCertForm] = useState({ title: "", issuer: "", issue_date: "", credential_url: "" });
  const [linkForm, setLinkForm] = useState({ label: "", url: "" });

  useEffect(() => {
    fetchProfile().then(r => { setProfile(r.data); setBioForm({ headline: r.data.headline || "", bio: r.data.bio || "" }); });
    fetchExperiences().then(r => setExperiences(r.data)).catch(() => {});
    fetchSkills().then(r => setSkills(r.data)).catch(() => {});
    fetchProjects().then(r => setProjects(r.data)).catch(() => {});
    fetchCertificates().then(r => setCertificates(r.data)).catch(() => {});
    fetchLinks().then(r => setLinks(r.data)).catch(() => {});
    fetchUserPosts().then(r => setUserPosts(r.data)).catch(() => {});
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append("avatar", file);
    const r = await updateProfile(fd); setProfile(r.data);
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append("cover_image", file);
    const r = await updateProfile(fd); setProfile(r.data);
  };

  const saveBio = async () => {
    const fd = new FormData();
    fd.append("headline", bioForm.headline);
    fd.append("bio", bioForm.bio);
    const r = await updateProfile(fd); setProfile(r.data); setModal(null);
  };

  const handleCreatePost = async () => {
    if (!postText.trim() && !postImageFile && !postVideoFile) return;
    const fd = new FormData();
    fd.append("content", postText.trim() || " ");
    if (postImageFile) fd.append("image", postImageFile);
    if (postVideoFile) fd.append("video", postVideoFile);
    setPostError("");
    try {
      const r = await createPost(fd);
      setUserPosts([r.data, ...userPosts]);
      setPostText(""); setPostImage(null); setPostImageFile(null);
      setPostVideo(null); setPostVideoFile(null);
      setPostModalOpen(false);
    } catch (err) {
      setPostError(err?.response?.status === 401 ? "You must be logged in." : "Failed to post.");
    }
  };

  const name = profile ? `${profile.user?.first_name || ""} ${profile.user?.last_name || profile.user?.username}`.trim() : "";

  return (
    <div className="pf-page">
      {/* ── HERO CARD ── */}
      <div className="pf-hero">
        {/* Cover */}
        <div className="pf-cover">
          <img src={fullUrl(profile?.cover_image) || defaultCover} alt="cover" />
          <button className="pf-cover__edit" onClick={() => coverRef.current.click()}>
            <CameraAltIcon fontSize="small" /> Edit cover
          </button>
          <input ref={coverRef} type="file" accept="image/*" hidden onChange={handleCoverChange} />
        </div>

        {/* Avatar */}
        <div className="pf-avatar-wrap">
          <img className="pf-avatar" src={fullUrl(profile?.avatar) || defaultAvatar} alt="avatar" />
          <button className="pf-avatar__edit" onClick={() => avatarRef.current.click()}>
            <CameraAltIcon style={{ fontSize: 16 }} />
          </button>
          <input ref={avatarRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
        </div>

        {/* Info */}
        <div className="pf-hero__info">
          <div className="pf-hero__top">
            <div>
              <h1 className="pf-name">{name}</h1>
              <p className="pf-headline">{profile?.headline || "Add a headline"}</p>
              <p className="pf-email">{profile?.user?.email}</p>
            </div>
            <button className="pf-icon-btn" onClick={() => setModal("editProfile")}><EditIcon /></button>
          </div>
          {profile?.bio && <p className="pf-bio">{profile.bio}</p>}
          <div className="pf-hero__actions">
            <button className="pf-btn pf-btn--primary">Open to</button>
            <button className="pf-btn">Add profile section</button>
            <button className="pf-btn pf-btn--outline">Resources</button>
          </div>
        </div>
      </div>

      <div className="pf-body">
        <div className="pf-main">

          {/* ── EXPERIENCE ── */}
          <Section icon={<WorkIcon />} title="Experience" items={experiences} onAdd={() => setModal("exp")}
            renderItem={(e) => (
              <div key={e.id} className="pf-item">
                <div className="pf-item__icon"><WorkIcon /></div>
                <div className="pf-item__content">
                  <h4>{e.title}</h4>
                  <p className="pf-item__sub">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  <p className="pf-item__date">{e.start_date} – {e.currently_working ? "Present" : e.end_date}</p>
                  {e.description && <p className="pf-item__desc">{e.description}</p>}
                </div>
                <button className="pf-icon-btn pf-icon-btn--sm" onClick={() => deleteExperience(e.id).then(() => setExperiences(experiences.filter(x => x.id !== e.id)))}><DeleteIcon fontSize="small" /></button>
              </div>
            )}
          />

          {/* ── SKILLS ── */}
          <Section icon={<CodeIcon />} title="Skills" items={skills} onAdd={() => setModal("skill")}
            renderItem={(s) => (
              <div key={s.id} className="pf-skill-chip">
                <span>{s.name}</span>
                {s.endorsements > 0 && <span className="pf-skill-chip__count">{s.endorsements}</span>}
                <button className="pf-icon-btn pf-icon-btn--xs" onClick={() => deleteSkill(s.id).then(() => setSkills(skills.filter(x => x.id !== s.id)))}><DeleteIcon style={{ fontSize: 14 }} /></button>
              </div>
            )}
          />

          {/* ── PROJECTS ── */}
          <Section icon={<CodeIcon />} title="Projects" items={projects} onAdd={() => setModal("project")}
            renderItem={(p) => (
              <div key={p.id} className="pf-item">
                <div className="pf-item__icon"><CodeIcon /></div>
                <div className="pf-item__content">
                  <h4>{p.title}</h4>
                  {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="pf-link"><LinkIcon style={{ fontSize: 14 }} /> {p.url}</a>}
                  {p.description && <p className="pf-item__desc">{p.description}</p>}
                  {p.start_date && <p className="pf-item__date">{p.start_date}{p.end_date ? ` – ${p.end_date}` : ""}</p>}
                </div>
                <button className="pf-icon-btn pf-icon-btn--sm" onClick={() => deleteProject(p.id).then(() => setProjects(projects.filter(x => x.id !== p.id)))}><DeleteIcon fontSize="small" /></button>
              </div>
            )}
          />

          {/* ── CERTIFICATES ── */}
          <Section icon={<VerifiedIcon />} title="Licenses & Certifications" items={certificates} onAdd={() => setModal("cert")}
            renderItem={(c) => (
              <div key={c.id} className="pf-item">
                <div className="pf-item__icon"><VerifiedIcon /></div>
                <div className="pf-item__content">
                  <h4>{c.title}</h4>
                  <p className="pf-item__sub">{c.issuer}</p>
                  {c.issue_date && <p className="pf-item__date">Issued {c.issue_date}</p>}
                  {c.credential_url && <a href={c.credential_url} target="_blank" rel="noreferrer" className="pf-link"><LinkIcon style={{ fontSize: 14 }} /> Show credential</a>}
                </div>
                <button className="pf-icon-btn pf-icon-btn--sm" onClick={() => deleteCertificate(c.id).then(() => setCertificates(certificates.filter(x => x.id !== c.id)))}><DeleteIcon fontSize="small" /></button>
              </div>
            )}
          />

          {/* ── LINKS ── */}
          <Section icon={<LinkIcon />} title="Links" items={links} onAdd={() => setModal("link")}
            renderItem={(l) => (
              <div key={l.id} className="pf-item pf-item--link">
                <LinkIcon style={{ color: "#0a66c2" }} />
                <a href={l.url} target="_blank" rel="noreferrer" className="pf-link">{l.label || l.url}</a>
                <button className="pf-icon-btn pf-icon-btn--sm" onClick={() => deleteLink(l.id).then(() => setLinks(links.filter(x => x.id !== l.id)))}><DeleteIcon fontSize="small" /></button>
              </div>
            )}
          />

          {/* ── POSTS ── */}
          <div className="pf-section pf-posts-section">
            <div className="pf-section__header">
              <div className="pf-section__title"><ArticleIcon /><h2>Posts</h2></div>
            </div>

            {/* Feed-style input box */}
            <div className="feed__inputContainer" style={{ marginBottom: 8 }}>
              <div className="feed__input" onClick={() => setPostModalOpen(true)}>
                <Avatar src={fullUrl(profile?.avatar) || defaultAvatar} className="feed__avatar" />
                <input
                  type="text"
                  placeholder="Start a post..."
                  readOnly
                  className="feed__inputField"
                />
              </div>
              <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#2981d9"
                  onClick={() => postFileRef.current.click()} />
                <InputOption Icon={SubscriptionsIcon} title="Video" color="#317f2c"
                  onClick={() => postVideoRef.current.click()} />
                <InputOption Icon={ArticleIcon} title="Write article" color="#bb680f"
                  onClick={() => setPostModalOpen(true)} />
              </div>
            </div>

            {/* Post list */}
            {userPosts.length === 0 ? (
              <p className="pf-empty">No posts yet. Share something!</p>
            ) : (
              userPosts.map((post) => (
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
                  is_archived={post.is_archived}
                  onDelete={(id) => setUserPosts(userPosts.filter(p => p.id !== id))}
                  onArchive={(id) => setUserPosts(userPosts.filter(p => p.id !== id))}
                />
              ))
            )}
          </div>

          {/* Hidden file inputs - always mounted */}
          <input type="file" accept="image/*" ref={postFileRef} hidden
            onChange={e => { const f = e.target.files[0]; if (f) { setPostImage(URL.createObjectURL(f)); setPostImageFile(f); setPostVideo(null); setPostVideoFile(null); setPostModalOpen(true); }}} />
          <input type="file" accept="video/*" ref={postVideoRef} hidden
            onChange={e => { const f = e.target.files[0]; if (f) { setPostVideo(URL.createObjectURL(f)); setPostVideoFile(f); setPostImage(null); setPostImageFile(null); setPostModalOpen(true); }}} />

          {/* Post creation modal */}
          {postModalOpen && (
            <div className="modalOverlay" onClick={() => setPostModalOpen(false)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                  <h2>Create a post</h2>
                  <button className="modal__closeBtn" onClick={() => setPostModalOpen(false)}>✕</button>
                </div>
                <div className="modal__body">
                  <div className="modal__user">
                    <Avatar src={fullUrl(profile?.avatar) || defaultAvatar} className="modal__avatar" />
                    <div><h4>{name}</h4></div>
                  </div>
                  <textarea
                    value={postText}
                    onChange={e => setPostText(e.target.value)}
                    placeholder="What do you want to talk about?"
                    className="modal__textarea"
                    autoFocus
                  />
                  {postImage && (
                    <div className="modal__imagePreview">
                      <img src={postImage} alt="preview" />
                      <button className="modal__removeImage" onClick={() => { setPostImage(null); setPostImageFile(null); }}>✕</button>
                    </div>
                  )}
                  {postVideo && (
                    <div className="modal__imagePreview">
                      <video src={postVideo} controls style={{ width: "100%", borderRadius: 4 }} />
                      <button className="modal__removeImage" onClick={() => { setPostVideo(null); setPostVideoFile(null); }}>✕</button>
                    </div>
                  )}
                </div>
                <div className="modal__footer">
                  <button className="modal__imageBtnSmall" onClick={() => postFileRef.current.click()}>📷 Photo</button>
                  <button className="modal__imageBtnSmall" onClick={() => postVideoRef.current.click()}>🎥 Video</button>
                  {postError && <span style={{ color: "red", fontSize: 12, flex: 1 }}>{postError}</span>}
                  <button
                    className="modal__postBtn"
                    onClick={handleCreatePost}
                    disabled={!postText.trim() && !postImageFile && !postVideoFile}
                  >Post</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <div className="pf-sidebar">
          <div className="pf-sidebar-card">
            <h4>Profile language</h4><p>English</p>
          </div>
          <div className="pf-sidebar-card">
            <h4>Public profile & URL</h4>
            <p style={{ color: "#0a66c2", fontSize: 13 }}>linkedin.com/in/{profile?.user?.username}</p>
          </div>
          <div className="pf-sidebar-card">
            <h4>Education</h4>
            <div className="pf-item" style={{ padding: 0, border: "none" }}>
              <SchoolIcon style={{ color: "rgba(0,0,0,0.4)" }} />
              <div className="pf-item__content">
                <h4 style={{ fontSize: 13 }}>Add education</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {modal === "editProfile" && (
        <Modal title="Edit intro" onClose={() => setModal(null)}>
          <label>Headline</label>
          <input className="pf-input" value={bioForm.headline} onChange={e => setBioForm({ ...bioForm, headline: e.target.value })} placeholder="e.g. Software Engineer at Google" />
          <label>About / Bio</label>
          <textarea className="pf-input pf-textarea" value={bioForm.bio} onChange={e => setBioForm({ ...bioForm, bio: e.target.value })} placeholder="Tell your story..." />
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={saveBio}>Save</button>
        </Modal>
      )}

      {modal === "exp" && (
        <Modal title="Add experience" onClose={() => setModal(null)}>
          {[["Title *", "title"], ["Company *", "company"], ["Location", "location"], ["Start date", "start_date"], ["End date", "end_date"]].map(([label, key]) => (
            <div key={key}><label>{label}</label>
              <input className="pf-input" value={expForm[key]} onChange={e => setExpForm({ ...expForm, [key]: e.target.value })} placeholder={label} />
            </div>
          ))}
          <label><input type="checkbox" checked={expForm.currently_working} onChange={e => setExpForm({ ...expForm, currently_working: e.target.checked })} /> Currently working here</label>
          <label>Description</label>
          <textarea className="pf-input pf-textarea" value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} />
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={() =>
            createExperience(expForm).then(r => { setExperiences([r.data, ...experiences]); setModal(null); setExpForm({ title: "", company: "", location: "", start_date: "", end_date: "", currently_working: false, description: "" }); })
          }>Save</button>
        </Modal>
      )}

      {modal === "skill" && (
        <Modal title="Add skill" onClose={() => setModal(null)}>
          <label>Skill name *</label>
          <input className="pf-input" value={skillForm.name} onChange={e => setSkillForm({ name: e.target.value })} placeholder="e.g. React, Python, UI Design" />
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={() =>
            createSkill(skillForm).then(r => { setSkills([...skills, r.data]); setModal(null); setSkillForm({ name: "" }); })
          }>Save</button>
        </Modal>
      )}

      {modal === "project" && (
        <Modal title="Add project" onClose={() => setModal(null)}>
          {[["Title *", "title"], ["Project URL", "url"], ["Start date", "start_date"], ["End date", "end_date"]].map(([label, key]) => (
            <div key={key}><label>{label}</label>
              <input className="pf-input" value={projForm[key]} onChange={e => setProjForm({ ...projForm, [key]: e.target.value })} placeholder={label} />
            </div>
          ))}
          <label>Description</label>
          <textarea className="pf-input pf-textarea" value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} />
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={() =>
            createProject(projForm).then(r => { setProjects([r.data, ...projects]); setModal(null); setProjForm({ title: "", description: "", url: "", start_date: "", end_date: "" }); })
          }>Save</button>
        </Modal>
      )}

      {modal === "cert" && (
        <Modal title="Add certification" onClose={() => setModal(null)}>
          {[["Title *", "title"], ["Issuing organization *", "issuer"], ["Issue date", "issue_date"], ["Credential URL", "credential_url"]].map(([label, key]) => (
            <div key={key}><label>{label}</label>
              <input className="pf-input" value={certForm[key]} onChange={e => setCertForm({ ...certForm, [key]: e.target.value })} placeholder={label} />
            </div>
          ))}
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={() =>
            createCertificate(certForm).then(r => { setCertificates([r.data, ...certificates]); setModal(null); setCertForm({ title: "", issuer: "", issue_date: "", credential_url: "" }); })
          }>Save</button>
        </Modal>
      )}

      {modal === "link" && (
        <Modal title="Add link" onClose={() => setModal(null)}>
          <label>Label</label>
          <input className="pf-input" value={linkForm.label} onChange={e => setLinkForm({ ...linkForm, label: e.target.value })} placeholder="e.g. GitHub, Portfolio" />
          <label>URL *</label>
          <input className="pf-input" value={linkForm.url} onChange={e => setLinkForm({ ...linkForm, url: e.target.value })} placeholder="https://..." />
          <button className="pf-btn pf-btn--primary pf-btn--full" onClick={() =>
            createLink(linkForm).then(r => { setLinks([...links, r.data]); setModal(null); setLinkForm({ label: "", url: "" }); })
          }>Save</button>
        </Modal>
      )}
    </div>
  );
}
