const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost/books'); // Reemplaza la URL con la correspondiente
    const books = response.data;
    res.send(JSON.stringify(books, null, 4));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving books');
  }
});





// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  try {
    const response = await axios.get('http://localhost/isbn/:isbn'); // Reemplaza la URL con la correspondiente
    const isbn = req.params.isbn;  
    res.send(books[isbn]);

  }
 catch (error) {
  console.error(error);
  res.status(500).send('Error retrieving books');
}
});

// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  try {
    const response = await axios.get('http://localhost/author/:author'); // Reemplaza la URL con la correspondiente
    const author = req.params.author;  
    // Convertir el objeto a un array
    const bookArray = Object.values(books);
    const filteredBooks = bookArray.filter((book) => book.author === author);
    res.send(filteredBooks);  

  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving books');
  }
  });


// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  try {
    const response = await axios.get('http://localhost/title/:title'); // Reemplaza la URL con la correspondiente
    const title = req.params.title;  
  // Convertir el objeto a un array
  const titleArray = Object.values(books);
  const filteredBooks = titleArray.filter((book) => book.title === title);
  res.send(filteredBooks);  
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving books');
  }
  });


//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  try {
  const response = await axios.get('http://localhost/title/:title'); // Reemplaza la URL con la correspondiente
  //Write your code here
  const isbn = req.params.isbn;  
  res.send(books[isbn].review)
}
catch (error) {
  console.error(error);
  res.status(500).send('Error retrieving books');
}
});
  
module.exports.general = public_users;
