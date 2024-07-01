const router = require("express").Router();
const Book = require("../models/bookModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Add a book
router.post("/add-book", authMiddleware, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.send({ success: true, message: "Book added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Update a book
router.put("/update-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Book updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Delete a book
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Get all books
router.get("/get-all-books", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: books });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// Get a book by id
router.get("/get-book-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.send({ success: true, data: book });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
