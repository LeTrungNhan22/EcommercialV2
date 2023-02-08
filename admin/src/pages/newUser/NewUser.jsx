import React from "react";
import "./NewUser.css";

export default function newUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <div className="newUserForm">
        <div className="newUserItem">
          <label htmlFor="">Username</label>
          <input type="text" placeholder="John" />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="johnsmith@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+84 3357781 " />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="Ho Chi Minh | Viet Nam" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGenderContainer">
            <input type="radio" id="male" value="male" name="gender" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" value="female" name="gender" />
            <label htmlFor="female">Female</label>
            <input type="radio" id="other " value="other   " name="gender" />
            <label htmlFor="other ">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label htmlFor="">Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <button className="newUserButton">Create</button>
    </div>
  );
}
