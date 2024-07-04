import { message, Table, Col, Row, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../Redux/loadersSlice";
import { GetAllBooks } from "../../services/books";
import "./Home.css"; // Add this line to import the CSS file

function Home() {
  const [books, setBooks] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
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

  return (
    <div className="book-list mt-2">
      <Row gutter={[16, 16]}>
        {books.map((book) => {
          return (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
              className="book-col"
            >
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              >
                <div className="book-card">
                  <img
                    src={book.image}
                    className="book-image"
                    alt={book.title}
                  />
                  <h1 className="book-title">{book.title}</h1>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
