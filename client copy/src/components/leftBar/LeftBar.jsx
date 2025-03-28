import "./leftBar.scss";
// import Friends from "/assets/1.png";
// import Groups from "/assets/2.png";
// import Market from "/assets/3.png";
// import Watch from "/assets/4.png";
// import Memories from "/assets/5.png";
// import Events from "/assets/6.png";
// import Gaming from "/assets/7.png";
// import Gallery from "/assets/8.png";
// import Videos from "/assets/9.png";
// import Messages from "/assets/10.png";
// import Tutorials from "/assets/11.png";
// import Courses from "/assets/12.png";
// import Fund from "/assets/13.png";
 import { AuthContext } from "../../context/AuthContext";
 import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='leftBar'>
    <div className="container">
     <div className="menu">
       <div className="user">
         { <img src={currentUser.profilePic} alt="" />  }

         <span>{currentUser.name}</span> 
       </div>
       <div className="item">
         <img src="/assets/1.png" alt="" />
         <span>Friends</span>
       </div>
       <div className="item">
         <img src="/assets/2.png" alt="" />
         <span>Groups</span>
       </div>
       <div className="item">
         <img src="/assets/3.png" alt="" />
         <span>Marketplace</span>
       </div>
       <div className="item">
         <img src="/assets/4.png" alt="" />
         <span>Watch</span>
       </div>
       <div className="item">
         <img src="/assets/5.png" alt="" />
         <span>Memories</span>
       </div>
     </div>
      <hr/>
      <div className="menu">
       <span>Your shortcuts</span>
     
      <div className="item">
         <img src="/assets/6.png" alt="" />
         <span>Events</span>
       </div>
       <div className="item">
         <img src="/assets/7.png" alt="" />
         <span>Gaming</span>
       </div>
       <div className="item">
         <img src="/assets/8.png" alt="" />
         <span>Gallery</span>
       </div>
       <div className="item">
         <img src="/assets/9.png" alt="" />
         <span>Videos</span>
       </div>
       <div className="item">
         <img src="/assets/10.png" alt="" />
         <span>Massages</span>
       </div>
       </div>
       <hr />
       <div className="menu">
         <span>Others..</span>
         <div className="item">
         <img src="/assets/11.png" alt="" />
         <span>Fundraiser</span>
       </div>
       <div className="item">
         <img src="/assets/12.png" alt="" />
         <span>Tutorials</span>
       </div>
       <div className="item">
         <img src="/assets/13.png" alt="" />
         <span>Courses</span>
       </div>
       </div>
    </div>
   </div>
  );
};

export default LeftBar;