import React from 'react';
import "./Headeroption.css";
import {Avatar} from "@mui/material";
import profilepicImg from './profilepic.png';

function Headeroption({ avatar, Icon, title, small }){
  const hasAvatar = typeof avatar === 'string' && avatar.trim().length > 0;
  const iconClass = `headeroption__icon ${small ? 'headeroption__icon--small' : ''}`;
  return (
    <div className="headerOption">
      {Icon && <Icon className={iconClass} />}
      {hasAvatar && (
        <Avatar className={iconClass} src={ avatar||profilepicImg} />
      )}
      <div className="headerOption" onClick={() => console.log("QrcodeIcon clicked")}></div>

      <h3 className="headerOption__title">{title}</h3>
      </div>
   
  );
}

export default Headeroption;
