import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import "./Basic.css";

function BasicDetails() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="card">
      <div className="card-content">
        <div className="detail">
          <h1 className="label">Name</h1>
          <h1 className="value">{user.name}</h1>
        </div>
        <div className="detail">
          <h1 className="label">Email</h1>
          <h1 className="value">{user.email}</h1>
        </div>
        <div className="detail">
          <h1 className="label">Phone</h1>
          <h1 className="value">{user.phone}</h1>
        </div>
        <div className="detail">
          <h1 className="label">Role</h1>
          <h1 className="value uppercase">{user.role}</h1>
        </div>
        <div className="detail">
          <h1 className="label">Registered On</h1>
          <h1 className="value">
            {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
