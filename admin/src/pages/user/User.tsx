import React from 'react'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link ,useParams} from "react-router-dom";
  import "./user.css";
import Topbar from '../../components/Topbar';
import { useSelector } from 'react-redux';

const User = () => {
  const {userId} = useParams()
  const user = useSelector((state:any)=>
  state.userProduct.users.find((user)=>user._id === userId))
  return (
    
    <div className="user">
      <Topbar />
    <div className="userTitleContainer">
      <h1 className="userTitle">View User</h1>
      {/* <Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link> */}
    </div>
    <div className="userContainer">
      <div className="userShow">
        <div className="userShowTop">
          <img
            src={user.img}
            alt=""
            className="userShowImg"
          />
          <div className="userShowTopTitle">
            <span className="userShowUsername">{user.username}</span>
            <span className="userShowUserTitle">Software Engineer</span>
          </div>
        </div>
        <div className="userShowBottom">
          <span className="userShowTitle">Account Details</span>
          <div className="userShowInfo">
            <PermIdentity className="userShowIcon" />
            <span className="userShowInfoTitle">{user.updatedAt}</span>
          </div>
          <div className="userShowInfo">
            <CalendarToday className="userShowIcon" />
            <span className="userShowInfoTitle">{user.createdAt}</span>
          </div>
          <span className="userShowTitle">ID</span>
          <div className="userShowInfo">
            <PhoneAndroid className="userShowIcon" />
            <span className="userShowInfoTitle">{user._id}</span>
          </div>
          <div className="userShowInfo">
            <MailOutline className="userShowIcon" />
            <span className="userShowInfoTitle">{user.email}</span>
          </div>
        </div>
      </div>
      <div className="userUpdate">
        <span className="userUpdateTitle">View</span>
        <form className="userUpdateForm">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                placeholder={user.username}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem">
              <label>Full Name</label>
              <input
                type="text"
                placeholder={user.username}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="text"
                placeholder={user.email}
                className="userUpdateInput"
              />
            </div>
          </div>
          <div className="userUpdateRight">
            <div className="userUpdateUpload">
              {/* <img
                className="userUpdateImg"
                src={user.img}
                alt=""
              /> */}
              {/* <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label> */}
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {/* <button className="userUpdateButton">Update</button> */}
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default User