import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, message, Input } from "antd";
import { HideLoading, ShowLoading } from "../../../Redux/loadersSlice";
import Button from "../../../Components/Button";
import moment from "moment";
import { GetAllUsers } from "../../../services/users";
import IssuedBooks from "../BorrowedBooks";
import "./Users.css";

const { Search } = Input;

function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      className: "table-id",
    },
    {
      title: "Name",
      dataIndex: "name",
      className: "table-name",
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "table-email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      className: "table-phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      className: "table-createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      className: "table-actions",
      render: (actions, record) => (
        <div>
          <Button
            title="Books"
            variant="outlined"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end items-center m-4">
        <Search
          placeholder="Search users"
          onChange={handleSearch}
          style={{
            width: 300,
            borderRadius: "4px",
            border: "1px solid #d9d9d9",
            padding: "5px 12px",
            fontSize: "16px",
          }}
          className="search-bar"
        />
      </div>
      <br />

      <Table dataSource={filteredUsers} columns={columns} />

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
