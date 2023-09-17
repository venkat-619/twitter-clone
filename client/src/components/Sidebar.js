import React from 'react'
import "./Sidebar.css"
import {useNavigate} from "react-router-dom";
// import TwitterIcon from '@material-ui/icons/Twitter'

import logo from "../assets/logo-black.png";
import SidebarOption from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';


// const API_BASE="http://localhost:4000";
const API_BASE="https://twitter-backend-murex.vercel.app/";
function Sidebar() {

   const navigate = useNavigate();
   const OnLogOut = async (e) => {
      // it prevents default values
      try {
          e.preventDefault();
      
          const response = await fetch(API_BASE + '/api/v1/logout', {
              method: "GET",
              credentials:"include",
          });

          const convertedRespones = await response.json();
          if(convertedRespones.success=== true){
              navigate("/");
          }

          // console.log(convertedRespones);
      } catch (error) {
         //  setErrorMessage("SomeThing Wron Please Close Window!!!");
          console.log(error);
      }
   }

    return (
        <div className = "sidebar">
           {/* <TwitterIcon
              className = "sidebar__twitterIcon"                
           />  */}
           <img src={logo} className="logo" alt ="logo"/>

           <SidebarOption active
              Icon = {HomeIcon}
              text = "Home"  
           />
           <SidebarOption 
              Icon = {SearchIcon}
              text = "Explore"  
           />
           <SidebarOption 
              Icon = {NotificationsIcon}
              text = "Notifications"  
           />
           <SidebarOption 
              Icon = {MailOutlineIcon}
              text = "Message"  
           />
           
           <SidebarOption
              Icon = {ListAltIcon} 
              text = "Lists"  
           />
           <SidebarOption 
              Icon = {PermIdentityIcon}
              text = "Profile"  
           />
           <SidebarOption 
              Icon = {MoreHorizIcon}
              text = "More"  
           />
           <Button variant = "outlined" className = "sidebar__tweet">Post</Button>
           <Button variant = "outlined" className = "sidebar__logout" 
           onClick={OnLogOut}
           >LogOut</Button>
        </div>
    )
}

export default Sidebar