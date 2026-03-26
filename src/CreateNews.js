import React, { useState } from "react";
import "./CreateNews.css";
import { FaTimes, FaPen } from "react-icons/fa";


const CreateNewsletterModal = ({ onClose }) => {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [frequency,setFrequency] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [logo, setLogo] = useState(null);
   const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
//   const isDisabled = groupName.length === 0 || description.length === 0;

   

  return (

    <div className="newsletterModal">

      <div className="newsletterBox">

        {/* Header */}
        <div className="newsletterHeader">
          <h2>Create a newsletter</h2>
           <FaTimes className="close-icon" onClick={onClose} />
          
        </div>

        {/* Description */}
        <p className="topText">
          Newsletters on LinkedIn allow you to share your perspective regularly
          by publishing articles. Your subscribers will receive notifications
          after each new edition.
        </p>

        <h3>Newsletter details</h3>

        {/* Row */}
        <div className="row">

          <div className="inputGroup">
            <label>Newsletter title*</label>
            <input
              type="text"
              placeholder="Add a title to your newsletter"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label>How often do you want to publish*</label>

            <select
              value={frequency}
              onChange={(e)=>setFrequency(e.target.value)}
            >
              <option>Select one</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>

          </div>

        </div>

        {/* Description */}
        <div className="inputGroup full">
          <label>Newsletter description*</label>

          <input
            type="text"
            placeholder="Add a description to your newsletter"
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
          />

          <small>This description appears alongside your newsletter title</small>
        </div>
        

        {/* Image Upload */}
       
        <div className="logo-wrapper">
            
            <p>Add an image or logo for your newsletter to increase engagement.</p>
            <small>The recommended image size is 300x300 pixels.</small>
            
       
                <div className="logo-box">
                    {logo ? (
                      <img src={logo} alt="logo" />
                    ) : (
                    <div className="logo-placeholder"></div>
                    )}
                           <label className="edit-icon">
                             <FaPen />
                              <input type="file" hidden onChange={handleLogoUpload} />
                            </label>
                    </div>
                </div>
       
        
         
                     

        {/* Bottom Section */}
        <div className="bottomInfo">
          <p><b>Your connections and followers will be invited to subscribe</b></p>
          <p>
            We'll notify your network when you publish the first edition of your newsletter.
          </p>
        </div>

        {/* Buttons */}
        <div className="footerButtons">
        

          <button className="cancelBtn">Cancel</button>
          <button className="doneBtn">Done</button>

        </div>
         {showModal && (
                 <CreateNewsletterModal onClose={() => setShowModal(false)} />
               )}

      
 </div>
    </div>
  );
}


export default CreateNewsletterModal;