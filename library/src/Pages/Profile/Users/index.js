import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../../Redux/loadersSlice";
import Button from "../../../Components/Button";
import moment from "moment";
import { GetAllUsers } from "../../../services/users";
function Users({role}) {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <Button title="Books" variant="outlined" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
}

export default Users;
