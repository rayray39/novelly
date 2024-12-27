// express server

const express = require('express')              // create server and use for defining the routes.
const fs = require('fs');                       // for file reading and writing (json files).
const bodyParser = require('body-parser');      // middleware to parse json requests.
const path = require('path');                   // to work with file and directories.
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// middleware to handle incoming http requests with JSON data.
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

// read data from json file.
const readUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// write data back to the json file.
const writeUsers = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// borrow book endpoint (POST method)
app.post('/borrow-book', (req, res) => {
    const { username, borrowedBook } = req.body;    // req is data from the frontend to backend.
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 21);    // due date is 3 weeks (21 days) from date of borrow.

    if (!username || !borrowedBook) {
        return res.status(400).json({ error: 'Username and borrowedBook are required.' });
    }

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (user.borrowed_books.some((book) => book.id === borrowedBook.id)) {
        return res.status(400).json({ error: `borrowedBook: [${borrowedBook.title}] already borrowed.` });
    }

    const borrowedBookWithDueDate = {...borrowedBook, dueDate: dueDate.toISOString()};   // add due date to borrowed book.
    // add the borrowed book to this user's borrowed_books list.
    user.borrowed_books = [...(user.borrowed_books || []), borrowedBookWithDueDate];
    writeUsers(users);
    return res.status(200).json({ message: `Successfully borrowed: ${borrowedBook.title}`, user }); // res is info sent from server (backend) back to client (frontend)
});

// get borrowed books endpoint (GET method)
app.get('/borrowed-books/:username', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!user.borrowed_books) {
        return res.status(404).json({ error: 'Borrowed books list not found.' });
    }

    // get the books inside this user's borrowed_books list.
    return res.status(200).json({ borrowed_books: user.borrowed_books || [] });
})

// return a borrowed book endpoint (DELETE method)
app.delete('/return-book/:username/:bookId', (req, res) => {
    const username = req.params.username;
    const bookId = req.params.bookId;

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const returnBook = user.borrowed_books.find((book) => book.id === bookId);
    if (!returnBook) {
        return res.status(404).json({ error: 'Book title not found.' });
    }

    // remove the book from the list of borrowed_books
    const bookIndex = user.borrowed_books.indexOf(returnBook);
    const [removeReturnBook] = user.borrowed_books.splice(bookIndex, 1);

    writeUsers(users);  // update the users.json file.

    return res.status(200).json({ message: `Successfully returned: ${removeReturnBook.title}`, user });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
