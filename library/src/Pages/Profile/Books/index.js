import { message, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../Components/Button";
import BookForm from "./BookForm";
import moment from "moment";
import Issues from "./Issues";
import IssueForm from "./IssueForm";
import { DeleteBook, GetAllBooks } from "../../../services/books";
import { HideLoading, ShowLoading } from "../../../Redux/loadersSlice";
import "./books.css"; // Import the CSS file

const { Search } = Input;

function Books() {
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBookForm, setOpenBookForm] = React.useState(false);
  const [openIssues, setOpenIssues] = React.useState(false);
  const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const dispatch = useDispatch();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        setFilteredBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBook(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value) ||
        book.category.toLowerCase().includes(value)
    );
    setFilteredBooks(filtered);
  };

  const columns = [
    {
      title: "Book",
      dataIndex: "image",
      render: (image) => <img src={image} alt="book" width="60" height="60" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
    },
    {
      title: "Total Copies",
      dataIndex: "totalCopies",
    },
    {
      title: "Available Copies",
      dataIndex: "availableCopies",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <i
            className="ri-delete-bin-5-line"
            onClick={() => deleteBook(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          ></i>
          <span
            className="underline"
            onClick={() => {
              setOpenIssues(true);
              setSelectedBook(record);
            }}
          >
            Issues
          </span>

          <span
            className="underline"
            onClick={() => {
              setOpenIssuesForm(true);
              setSelectedBook(record);
            }}
          >
            Issue Book
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="books-container">
      <div className="header-container">
        <Button
          title="Add Book"
          onClick={() => {
            setFormType("add");
            setSelectedBook(null);
            setOpenBookForm(true);
          }}
        />
        <Search
          placeholder="Search books"
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredBooks}
        className="mt-1"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
      />

      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}

      {openIssues && (
        <Issues
          open={openIssues}
          setOpen={setOpenIssues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          reloadBooks={getBooks}
        />
      )}

      {openIssuesForm && (
        <IssueForm
          open={openIssuesForm}
          setOpen={setOpenIssuesForm}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          getData={getBooks}
          type="add"
        />
      )}
    </div>
  );
}

export default Books;
