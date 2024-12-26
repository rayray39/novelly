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

    if (!username || !borrowedBook) {
        return res.status(400).json({ error: 'Username and borrowedBook are required.' });
    }

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    // add the borrowed book to this user's borrowed_books list.
    user.borrowed_books = [...(user.borrowed_books || []), borrowedBook];
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
    // get the books inside this user's borrowed_books list.
    return res.status(200).json({ borrowed_books: user.borrowed_books || [] });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
