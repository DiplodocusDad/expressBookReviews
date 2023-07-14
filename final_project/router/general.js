const express = require('express');
//const Promise = require('promise');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
})




// Get the book list available in the shop
public_users.get('/',function (req, res, next) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  return new Promise(function(resolve, reject){
    res.send(JSON.stringify(books, null, 4));
  });
  //return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  
  if (req.params.isbn>0&&req.params.isbn<11){
    return new Promise(function(resolve, reject){
        res.send(books[req.params.isbn]);
    });
    //return res.send(books[req.params.isbn]);
  } else {
      return res.status(300).json({message: "invalid isbn"});
  }
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let filteredBooks = [];
  return new Promise(function(resolve, reject){
    for (var i = 1; i<11; i++){
        //console.log(i);
        //let bookData = [];
        //console.log(books[i].author);
        if (books[i].author === req.params.author){
          //console.log(books[i].author+req.params.author);
          filteredBooks.push(books[i]);
        }
        
    }
    if (filteredBooks.length>0){
        resolve(res.send(JSON.stringify(filteredBooks, null, 4)));
        
        //return res.send(JSON.stringify(filteredBooks, null, 4));
      }
      else {
        resolve(res.status(200).send("Author not found"));
      }
  });
  /*for (var i = 1; i<11; i++){
      //console.log(i);
      //let bookData = [];
      //console.log(books[i].author);
      if (books[i].author === req.params.author){
        //console.log(books[i].author+req.params.author);
        filteredBooks.push(books[i]);
      }
      
  }
  if (filteredBooks.length>0){
    return new Promise(function(resolve, reject){
        res.send(JSON.stringify(filteredBooks, null, 4));
    });
    //return res.send(JSON.stringify(filteredBooks, null, 4));
  }
  else {
    return res.status(200).send("Author not found");
  }*/
  return res.status(500).send("Error");
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let filteredBooks = [];
  return new Promise(function(resolve, reject){
    for (var i = 1; i<11; i++){
        //console.log(i);
        //let bookData = [];
        //console.log(books[i].author);
        if (books[i].title === req.params.title){
            console.log(books[i].title+req.params.title);
            filteredBooks.push(books[i]);
        }
        
    }
    if (filteredBooks.length>0){
        return res.send(JSON.stringify(filteredBooks, null, 4));
    }
    else {
        return res.status(200).send("Title not found");
    }
  });
  return res.status(500).send("Error");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  if (req.params.isbn>0&&req.params.isbn<11){
    return res.send(books[req.params.isbn].reviews);
  } else {
      return res.status(300).json({message: "invalid isbn"});
  }
});

module.exports.general = public_users;
