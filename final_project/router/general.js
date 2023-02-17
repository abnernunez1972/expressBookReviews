const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
  //Write your code here
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;  
  res.send(books[isbn])
  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;  
// Convertir el objeto a un array
const bookArray = Object.values(books);
  const filteredBooks = bookArray.filter((book) => book.author === author);
  res.send(filteredBooks);  

  });
  


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;  
// Convertir el objeto a un array
const titleArray = Object.values(books);
  const filteredBooks = titleArray.filter((book) => book.title === title);
  res.send(filteredBooks);  

  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;  
  res.send(books[isbn].review)
});

module.exports.general = public_users;
