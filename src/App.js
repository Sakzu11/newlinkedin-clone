import React from "react";
import "./App.css";
 import Header from './Header';
import Feed from './feed';
import Sidebar from './sidebar';
import Widgets from './Widgets';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNetwork from "./MyNetwork";
import Messaging from "./Messaging";
import Notification from "./Notification";
import Profile from "./profile";
import SavedItems from "./save";
// import InProgress from "./";
// import Applied from "./";
import GroupsSidebar from "./groups";
import CreateGroup from "./create";
import Newsletters from "./news";
import EventsPage from "./Event";
import CreateNews from "./CreateNews";
import Jobs from "./jobs";
import QrCodePage from "./QrCodePage";
import Main from"./main";
import { selectuser } from "./userSlice";
import {useSelector} from "react-redux";
import Login from './login';
import Premium from'./premium';




function App() {
 const user = useSelector(selectuser)
 console.log("USER:", user);
  return (
    <BrowserRouter>
     <Header />
       <div className="app">
       
        { !user ? 
        <Login/>:(
          

        
        <Routes>
          
       

          {/* HOME PAGE */}
         
          <Route
            path="/"
            element={
              <div className="app__body">
                
                <Sidebar />
                <Feed />
                <Widgets/>
              
              </div>
            }
          />
           

          {/* OTHER PAGES (Full Width) */}
        <Route path="/profile"element={<Profile/>} />
        <Route path="/MyNetwork"element={<MyNetwork />} />
        <Route path="/job"element={<Jobs />} />
        <Route path="/messaging"element={<Messaging />} />
        <Route path="/notification"element={<Notification />} />
        <Route path="/qrcode" element={<QrCodePage />} />
        <Route path="/saved" element={<SavedItems />} />
        {/* <Route path="/InProgress"element={<InProgress />} />
        <Route path ="/Applied"element={<Applied />} /> */}
        <Route path="/groups"element={<GroupsSidebar />} />
        <Route path="/create"element={<CreateGroup />} />
        <Route path ="/news"element={<Newsletters/>} /> 
        <Route path="/events"element={<EventsPage />} />
        <Route path="/CreateNews"element={<CreateNews />} />
        <Route path ="/main"element={<Main/>}/>
        <Route path ="/premium"element={<Premium/>}/>
      </Routes>

      )}
      </div>
    </BrowserRouter>
  );
}    
export default App;     
