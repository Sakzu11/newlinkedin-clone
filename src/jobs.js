import React from "react";
import { Avatar } from "@mui/material";
import "./jobs.css";
import JobCard from "./jobcard";
import imageImg from './image.png';
import profilepicImg from './profilepic.png';
import ListIcon from '@mui/icons-material/List';
import BookmarkupIcon from'@mui/icons-material/Bookmark'; 
import premiumImg from './premium.png';


 


function Jobs() {
   
  const jobs = [
   {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
  },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
     {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
     {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
    },
    {
      title: "Backend Developer",
      company: "Amazon",
      location: "Hyderabad, India",
      type: "Remote",
    },
    {
      title: "React Developer",
      company: "Microsoft",
      location: "Pune, India",
      type: "Internship",
    },
  ];
  

  return (
    < div className="sidebar">
      <div className="profile">
      <div className="sidebar__left">
         <img src={imageImg} alt="profile banner" />
        <div className="job__sidebar">
         <Avatar className="avatar" src={profilepicImg} />
        </div>
         <h2>Harshada Panthare</h2>
         <h3>harshadapanthare30@gmail.com</h3> <br></br>
         <p>Student at ASM Group of Institutes<br></br>Web development | HTML | CSS<br></br>
          Pimpri Chinchwad, Maharashtra<br></br></p>
         <p><b><a href="">Overload Ware Labs Ai (Owl Ai)</a> </b></p>
       </div>
       
       <div className="sidebar__middle">
        <a href=""><BookmarkupIcon/><h4>My Jobs</h4></a> <br></br>
        <a href="">< ListIcon/><h4>prefrences</h4></a> <br></br>
        <a href=""><img src={premiumImg} alt="Premium"className="image" /><h4>My carrer insight</h4></a>
 
        <a href=""><h3>Post Free Jobs</h3></a>


       </div>
     
     </div>
        
     <div>
       <h2>Jobs Recommended for You</h2>

      <div className="sidebar__Right">
        <div className="sidebar__container">
          {jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            type={job.type}
          />
          

           ))  
           }
     
        </div>
      </div>
     
   
  
   
     </div>
      </div>
        
       


);
} 
  

export default Jobs;
