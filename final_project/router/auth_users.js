const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
let books = require("./booksdb.js");
const regd_users = express.Router();


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;  
  let book = books[isbn]
  if (book) { //Check is books exists      
      let review = req.body.review;      
      if(review) {
          book["reviews"] = review
      }
      
      books[isbn]=book;
      res.send(`Review with the ISBN  ${isbn} updated.`);
  }
  else{
      res.send("Unable to find ISBN!");
  }
  
});


// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;  
  let book = books[isbn]
  if (book) { //Check is books exists      
      let review = req.body.review;      
      if(review) {
        book["reviews"] = review;
      }
      
      delete books[isbn][book];
      res.send(`Review with the ISBN  ${isbn} deleted.`);
      res.send(JSON.stringify(books,null,4));

  }
  else{
      res.send("Unable to find ISBN!");
  }
  
});




module.exports.authenticated = regd_users;
