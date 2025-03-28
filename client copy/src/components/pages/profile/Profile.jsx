import  './profile.scss'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../posts/Posts"
function Profile() {
  return (
   
      <div className="profile">
        <div className="images">
          <img src="https://m.media-amazon.com/images/I/710GjkD28nL._SL1000_.jpg" alt="" className='cover' />
          <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg" alt="" className='profilePic' />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
               <a href="http://facebook.com">
               <FacebookTwoToneIcon fontSize='large'/>
               </a>
               <a href="http://facebook.com">
               <LinkedInIcon fontSize='large'/>
               </a>
               <a href="http://facebook.com">
               <InstagramIcon fontSize='large'/>
               </a>
               <a href="http://facebook.com">
               <TwitterIcon fontSize='large'/>
               </a>
               <a href="http://facebook.com">
               <PinterestIcon fontSize='large'/>
               </a>
            </div>
            <div className="center">
              <span>Saurabh Singh</span>
              <div className="info">
                <div className="item">
                <PlaceIcon/>
                <span>India</span>
                </div>
                <div className="item">
                <LanguageIcon/>
                <span>None</span>
                </div>
               
                </div>
                <button>follow</button>
            </div>
            <div className="right">
            <EmailOutlinedIcon/>
            <MoreVertIcon/>
            </div>
          </div>
          <Posts/>
        </div>
       
      </div>
   
  )
}

export default Profile
