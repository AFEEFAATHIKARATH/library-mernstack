import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../../Redux/loadersSlice";
import { DeleteIssue, GetIssues, ReturnBook } from "../../../services/issues";
import { useDispatch } from "react-redux";
import moment from "moment";
import IssueForm from "./IssueForm";




function Issues({ open = false, setOpen, selectedBook, reloadBooks }) {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const dispatch = useDispatch();

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({ book: selectedBook._id });
      dispatch(HideLoading());

      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (open) {
      getIssues();
    }
  }, [open]);

  const handleReturn = async (issue) => {
    try {
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD");

      if (today > dueDate) {
        issue.fine = moment(today).diff(dueDate, "days") * 1;
      }

      issue.returnedDate = new Date();
      issue.book = issue.book._id;

      dispatch(ShowLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDelete = async (issue) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteIssue({ ...issue, book: issue.book._id });
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="flex flex-col">
          <span>{_id}</span>
          <span className="text-xs text-gray-500">{record.user.name}</span>
        </div>
      ),
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Return Date (Due Date)",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Amount",
      dataIndex: "rent",
      render: (rent, record) => (
        <div className="flex flex-col">
          <span>Rent : {record.rent}</span>
          <span className="text-xs text-gray-500">
            Fine : {record.fine || 0}
          </span>
        </div>
      ),
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) =>
        returnedDate
          ? moment(returnedDate).format("DD-MM-YYYY hh:mm A")
          : "Not Returned Yet",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="flex gap-1">
          {!record.returnedDate && (
            <>
              <Button
                onClick={() => {
                  setSelectedIssue(record);
                  setShowIssueForm(true);
                }}
                variant="outlined"
              >
                Renew
              </Button>
              <Button onClick={() => handleReturn(record)} variant="outlined">
                Return Now
              </Button>
            </>
          )}
          <Button onClick={() => handleDelete(record)} variant="outlined">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={`Issues of ${selectedBook.title}`}
      visible={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1400}
      centered
    >
      <Table columns={columns} dataSource={issues} rowKey="_id" />

      {showIssueForm && (
        <IssueForm
          selectedBook={selectedBook}
          selectedIssue={selectedIssue}
          open={showIssueForm}
          setOpen={setShowIssueForm}
          getData={() => {
            getIssues();
            reloadBooks();
          }}
          type="edit"
        />
      )}
    </Modal>
  );
}

export default Issues;
