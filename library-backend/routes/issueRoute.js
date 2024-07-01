const router = require('express').Router();
const Issue = require('../models/issueModel')
const Book = require('../models/bookModel')
const User = require('../models/usersModel')
const authMiddleware = require('../middlewares/authMiddleware')

//issue a book  to patron
router.post('/issue-new-book', authMiddleware, async (req, res) => {
    try {
        //inventory adjustment(available copies must be decremented by 1)
        await Book.findOneAndUpdate({
            _id:req.body.book
        },
            { $inc: { availableCopies: -1 } }
            
        )
        //issue book to patron (create new issue record)
        const newIssue = new Issue(req.body);
        await newIssue.save();
        return res.send({
            success: true,
            message: "Book Issued successfully",
            data:newIssue,

        })
    } catch (error) {
        return res.send({
            success: false,
            message:error.message
        })
 }
})



module.exports = router;